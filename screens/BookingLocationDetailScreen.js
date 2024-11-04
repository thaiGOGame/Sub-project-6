import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import GeneralLocationInfo from './GeneralLocationInfo'; // Adjust the import path as needed
import FacilitiesAndServices from './FacilitiesAndServices'; // Updated import
import Reviews from './Reviews'; // Updated import
import Policies from './Policies';
import Description from './Description';

export default function BookingLocationDetailScreen({
  navigation,
  route,
  user,
  accUserRelations,
  setAccUserRelations,
}) {
  const { item } = route.params || {}; // Access `paymentData` from route.params
  const [isLoading, setIsLoading] = useState(false); // State for loading modal
  const [isError, setIsError] = useState(false); // State to determine error/success
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(''); // State for message
  const [isModalVisible, setIsModalVisible] = useState(false);
  const facilitiesData = item.facilities ? JSON.parse(item.facilities) : [];
  const formattedFacilitiesData = facilitiesData.map((facility) => ({
    icon: facility.toLowerCase(), // Ensure facility names match icon names
    title: facility.charAt(0).toUpperCase() + facility.slice(1), // Capitalize the first letter
  }));
  const paymentInfo = accUserRelations.find(
    (relation) => relation.acc_id === item.id && relation.user_id === user.id
  );
  const amount = paymentInfo ? paymentInfo.amount : 'N/A'; // Hiển thị số tiền hoặc 'N/A'
  const bookingDate = paymentInfo
    ? `${paymentInfo.date} at ${paymentInfo.time}`
    : 'N/A';

  // Generate a random number of reviews (between 5 and 300)
  const randomReviewsCount = Math.floor(Math.random() * (300 - 5 + 1)) + 5; // Between 5 and 300

  const handleUnbooking = async () => {
    // const existingBooking = accUserRelations.find(
    //   (relation) => relation.acc_id === item.id && relation.user_id === user.id && relation.date !==null
    // );

    // if (existingBooking) {
    //   setIsError(true);
    //   setMessage("This location has been booking!")
    //   setIsModalVisible(true); // Show modal if the place is already booked
    //   return; // Exit the function early if the booking already exists
    // }

    const bookingData = {
      user_id: user.id,
      acc_id: item.id,
      is_favourite: accUserRelations.find((item) => item.user_id === user.id)
        .is_favourite,
      date: null, // Set to null
      time: null, // Set to null
      amount: 0, // Set to 0
      start_date: null, // Set to null
      end_date: null, // Set to null
      guests: null, // Set to null
      payment_option: null, // Set to null
    };

    setIsLoading(true); // Show loading modal

    try {
      const response = await fetch(
        'http://localhost:5000/update-acc-relation',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to update accommodation-user relation.'
        );
      }
      setIsLoading(false); // Show loading modal
      setAccUserRelations((prevRelations) =>
        prevRelations.map((relation) =>
          relation.user_id === bookingData.user_id &&
          relation.acc_id === bookingData.acc_id
            ? { ...relation, ...bookingData } // Update with null values for unbooking
            : relation
        )
      );
      setIsSuccess(true); // Set success state
      setMessage('Unbooking successfully!'); // Set success message
    } catch (error) {
      setIsLoading(false); // Show loading modal
      setMessage(error.message); // Set error message
      setIsError(true); // Indicate error
      console.error('Unbooking Error:', error.message); // Detailed logging in console
    } finally {
      setIsLoading(false); // Hide loading modal
      setIsModalVisible(true); // Show modal for success/error feedback
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (isSuccess) navigation.navigate('Booking Home Screen');
  };
  return (
    <View style={styles.container}>
      <LoadingModal
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        successMessage="Booking successfully!"
        errorMessage={message}
        onClose={() => setIsModalVisible(false)}
      />

      {/* Error Modal */}
      <MessageModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        isError={isError}
        message={message}
      />
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image section */}
        <Image source={item.image_path} style={styles.image} />

        {/* General Info Section */}
        <GeneralLocationInfo
          item={item}
          navigation={navigation}
          reviews={randomReviewsCount}
          rating={item.rating}
        />

        {/* Separator Line */}
        <View style={styles.separator} />
        <FacilitiesAndServices
          accommodation={{ ...item, facilities: formattedFacilitiesData }}
          navigation={navigation}
        />
        {/* Separator Line */}
        <View style={styles.separator} />
        {/* Pass randomReviewsCount to Reviews */}
        <Reviews
          navigation={navigation}
          reviewsCount={randomReviewsCount}
          rating={item.rating}
        />
        {/* Separator Line */}
        <View style={styles.separator} />
        <Policies />
        <View style={styles.separator} />
        <Description accommodation={item} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerPrice}>${amount}</Text>
        <TouchableOpacity style={styles.unbookButton} onPress={handleUnbooking}>
          <Text style={styles.unbookText}>Unbook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
import MessageModal from '../assets/components/MessageModal'; // Import the MessageModal
import LoadingModal from '../assets/components/LoadingModal'; // Import the MessageModal

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 80, // Add padding to avoid overlap with the footer
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    padding: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unbookButton: {
    backgroundColor: 'red', // Change the button color to red
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  unbookText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
