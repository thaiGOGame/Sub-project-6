import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Import the Picker

import DateTimePicker from '@react-native-community/datetimepicker';
import MessageModal from '../assets/components/MessageModal'; // Import the MessageModal
import LoadingModal from '../assets/components/LoadingModal'; // Import the MessageModal

const calculateNights = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  const nights = differenceInTime / (1000 * 3600 * 24);
  return Math.max(1, nights);
};

const ConfirmAndPayScreen = ({
  navigation,
  route,
  user,
  accUserRelations,
  setAccUserRelations,
}) => {
  const { item } = route.params;
  const [paymentOption, setPaymentOption] = useState('full');
  const [paymentMethod, setPaymentMethod] = useState('Credit card');
  const [taxAmount, setTaxAmount] = useState(0);
  const [randomFees, setRandomFees] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBasePrice, setTotalBasePrice] = useState(0);
  const [editDatesModalVisible, setEditDatesModalVisible] = useState(false);
  const [editGuestsModalVisible, setEditGuestsModalVisible] = useState(false);
  const [currentEndDate, setCurrentEndDate] = useState(new Date(item.end_date));
  const [isLoading, setIsLoading] = useState(false); // State for loading modal
  const [isError, setIsError] = useState(false); // State to determine error/success
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(''); // State for message
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTotalGuests, setCurrentTotalGuests] = useState(
    item.total_guests
  );

  const handleEditDates = () => setEditDatesModalVisible(true);
  const handleEditGuests = () => setEditGuestsModalVisible(true);

  const saveNewEndDate = () => {
    setEditDatesModalVisible(false);
    setCurrentEndDate(newEndDate);
  };
  const saveNewTotalGuests = () => {
    setEditGuestsModalVisible(false);
    setCurrentTotalGuests(newTotalGuests);
  };

  const randomFeeOptions = [
    { label: 'Cleaning fee', amount: 10 },
    { label: 'Service fee', amount: 20 },
    { label: 'Resort fee', amount: 15 },
    { label: 'Administration fee', amount: 5 },
    { label: 'Insurance fee', amount: 25 },
    { label: 'Security deposit', amount: 50 },
    { label: 'Late checkout fee', amount: 30 },
    { label: 'Early check-in fee', amount: 35 },
    { label: 'Pet fee', amount: 40 },
    { label: 'Parking fee', amount: 12 },
  ];

  const getRandomFees = () => {
    const randomCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    const shuffled = randomFeeOptions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  useEffect(() => {
    const fees = getRandomFees();
    setRandomFees(fees);

    const randomNights = calculateNights(item.start_date, currentEndDate);
    const pricePerNight = parseInt(item.price.replace('$', ''));
    const basePrice = pricePerNight * currentTotalGuests * randomNights;
    const totalRandomFees = fees.reduce((total, fee) => total + fee.amount, 0);

    const taxRate = item.tax_inclusive ? 0 : 10; // For example, set a constant 12% rate
    const taxAmount = (basePrice + totalRandomFees) * (taxRate / 100);

    const total = basePrice + totalRandomFees + taxAmount;
    setTotalBasePrice(basePrice);
    setTaxAmount(taxAmount);
    setTotalPrice(total);
  }, [item, currentEndDate, currentTotalGuests]);
  const incrementDate = () => {
    const nextDate = new Date(currentEndDate);
    nextDate.setDate(nextDate.getDate() + 1);
    if (nextDate <= new Date(item.end_date)) setCurrentEndDate(nextDate);
  };

  const decrementDate = () => {
    const prevDate = new Date(currentEndDate);
    prevDate.setDate(prevDate.getDate() - 1);
    if (prevDate >= new Date(item.start_date)) setCurrentEndDate(prevDate);
  };

  const incrementGuests = () => {
    if (currentTotalGuests < item.total_guests)
      setCurrentTotalGuests(currentTotalGuests + 1);
  };

  const decrementGuests = () => {
    if (currentTotalGuests > 1) setCurrentTotalGuests(currentTotalGuests - 1);
  };
  const handleBooking = async () => {
    // Getting the current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const bookingData = {
      user_id: user.id,
      acc_id: item.id,
      is_favourite: accUserRelations.find((relation) => relation.user_id === user.id && relation.acc_id === item.id)?.is_favourite || false,
      date,
      time,
      amount: totalPrice.toFixed(2),
      start_date: new Date(item.start_date).toISOString().split('T')[0], // Format date properly
      end_date: currentEndDate.toISOString().split('T')[0], // Format date properly
      guests: currentTotalGuests,
      payment_option: paymentOption,
    };

    setIsLoading(true); // Show loading modal

    try {
      // Check if there's an existing booking for the same accommodation
      const existingBookingIndex = accUserRelations.findIndex(
        (relation) => relation.acc_id === item.id && relation.user_id === user.id
      );

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

      // Update accUserRelations based on whether the booking already exists
      setAccUserRelations((prevRelations) => {
        if (existingBookingIndex !== -1) {
          // If the booking exists, replace it
          const updatedRelations = [...prevRelations];
          updatedRelations[existingBookingIndex] = bookingData; // Replace the existing booking
          return updatedRelations;
        } else {
          // If the booking doesn't exist, add a new one
          return [...prevRelations, bookingData];
        }
      });

      setIsSuccess(true); // Set success state
      setMessage('Booking successfully!'); // Set success message
    } catch (error) {
      setMessage(error.message); // Set error message
      setIsError(true); // Indicate error
      console.error('Booking Error:', error.message); // Detailed logging in console
    } finally {
      setIsLoading(false); // Hide loading modal
      setIsModalVisible(true); // Show modal for success/error feedback
    }
  };


  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (isSuccess)
      navigation.navigate('Payment Success Screen', {
        amount: totalPrice,
        refNumber: 'U' + user.id + 'A' + item.id,
        //itemID: item.id,
        paymentMethod,
        paymentOption,
      });
  };

  const isFavourite = (userId, itemId, accUserRelations) => {
    return accUserRelations.some(
      (relation) =>
        relation.user_id === userId &&
        relation.acc_id === itemId &&
        relation.is_favourite === true
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm and pay</Text>
      </View>

      <View style={styles.listingContainer}>
        <View style={styles.listingInfo}>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.listingTitle}>{item.title}</Text>
          <Text style={styles.rating}>
            ★ {item.rating} (
            {isFavourite(user.id, item.id, accUserRelations)
              ? 'Favourite'
              : 'Not Favourite'}
            )
          </Text>
        </View>
        <Image source={item.image} style={styles.listingImage} />
      </View>

      <View style={styles.tripDetailsContainer}>
        <Text style={styles.sectionTitle}>Your trip</Text>
        <View style={styles.tripDetailRow}>
          <View>
            <Text style={styles.tripDetailLabel}>Dates</Text>
            <Text>{`${new Date(item.start_date).toLocaleDateString(
              'en-CA'
            )} to ${new Date(currentEndDate).toLocaleDateString(
              'en-CA'
            )}`}</Text>
          </View>
          <TouchableOpacity onPress={handleEditDates}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tripDetailRow}>
          <View>
            <Text style={styles.tripDetailLabel}>Guests</Text>
            <Text>{`${currentTotalGuests} guest(s)`}</Text>
          </View>
          <TouchableOpacity onPress={handleEditGuests}>
            <Text style={styles.editButton}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.paymentOptionsContainer}>
        <Text style={styles.sectionTitle}>Payment options</Text>
        <View style={styles.paymentOption}>
          <RadioButton
            value="full"
            status={paymentOption === 'full' ? 'checked' : 'unchecked'}
            onPress={() => setPaymentOption('full')}
          />
          <View style={styles.paymentOptionInfo}>
            <Text style={styles.paymentOptionTitle}>Pay in full</Text>
            <Text style={styles.paymentOptionDescription}>
              Pay ${totalPrice.toFixed(2)} now to finalize your booking.
            </Text>
          </View>
        </View>
        <View style={styles.paymentOption}>
          <RadioButton
            value="part"
            status={paymentOption === 'part' ? 'checked' : 'unchecked'}
            onPress={() => setPaymentOption('part')}
          />
          <View style={styles.paymentOptionInfo}>
            <Text style={styles.paymentOptionTitle}>Pay a part now</Text>
            <Text style={styles.paymentOptionDescription}>
              Make a partial payment now and pay the rest later.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.priceDetailsContainer}>
        <Text style={styles.sectionTitle}>Price details</Text>

        {/* Conditionally display random fees if full payment is selected */}
        {paymentOption === 'full' && (
          <View>
            {randomFees.map((fee, index) => (
              <View key={index} style={styles.priceRow}>
                <Text style={styles.priceLabel}>{fee.label}</Text>
                <Text>${fee.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Display core rate with calculation */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            {`$${item.price.replace(
              '$',
              ''
            )} x ${currentTotalGuests} guests x ${calculateNights(
              item.start_date,
              currentEndDate
            )} nights`}
          </Text>
          <Text>${totalBasePrice.toFixed(2)}</Text>
        </View>

        {/* Display tax amount */}
        {paymentOption === 'full' && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text>${taxAmount.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            $
            {paymentOption === 'full'
              ? totalPrice.toFixed(2)
              : totalBasePrice.toFixed(2)}
          </Text>
        </View>
      </View>
      {/* ComboBox for selecting payment method */}
      <View style={styles.pickerContainer}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <Picker
          selectedValue={paymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}>
          <Picker.Item label="Credit Card" value="Credit card" />
          <Picker.Item label="PayPal" value="PayPal" />
          <Picker.Item label="Bank Transfer" value="Bank transfer" />
          <Picker.Item label="Cash" value="Cash" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.bookNowButton} onPress={handleBooking}>
        <Text style={styles.bookNowButtonText}>Confirm and Pay</Text>
      </TouchableOpacity>

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

      <Modal visible={editDatesModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit End Date</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={decrementDate}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{currentEndDate.toDateString()}</Text>
            <TouchableOpacity
              onPress={incrementDate}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={saveNewEndDate}>
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={editGuestsModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Guests</Text>
          <View style={styles.guestPickerContainer}>
            <TouchableOpacity
              onPress={decrementGuests}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'-'}</Text>
            </TouchableOpacity>
            <Text style={styles.guestText}>{currentTotalGuests}</Text>
            <TouchableOpacity
              onPress={incrementGuests}
              style={styles.arrowButton}>
              <Text style={styles.arrowText}>{'+'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={saveNewTotalGuests}>
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  listingInfo: {
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  listingImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  }, // Updated styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  guestPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  arrowButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
  },
  guestText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#00a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  tripDetailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookNowButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tripDetailLabel: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    fontSize: 16,
    color: '#00a',
  },
  paymentOptionsContainer: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionInfo: {
    marginLeft: 10,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentOptionDescription: {
    fontSize: 14,
    color: 'gray',
    flexShrink: 1,
  },
  priceDetailsContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: 'gray',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ConfirmAndPayScreen;
