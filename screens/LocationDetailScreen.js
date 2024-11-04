import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import GeneralLocationInfo from './GeneralLocationInfo'; // Adjust the import path as needed
import FacilitiesAndServices from './FacilitiesAndServices'; // Updated import
import Reviews from './Reviews'; // Updated import
import Policies from './Policies';
import Description from './Description';

export default function LocationDetailScreen({ navigation, route }) {
  const { item } = route.params || {}; // Safely access `route.params` and fallback to an empty object

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  // Generate a random number of reviews (between 5 and 300)
  const randomReviewsCount = Math.floor(Math.random() * (300 - 5 + 1)) + 5; // Between 5 and 300

  // Generate random ratings and calculate the average rating
  let totalRating = 0;
  for (let i = 0; i < randomReviewsCount; i++) {
    totalRating += Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
  }
  const averageRating = totalRating / randomReviewsCount; // Calculate average rating

  // Parse the facilities from the JSON string to an array
  const facilitiesData = item.facilities ? JSON.parse(item.facilities) : [];

  const formattedFacilitiesData = facilitiesData.map((facility) => ({
    icon: facility.toLowerCase(), // Ensure facility names match icon names
    title: facility.charAt(0).toUpperCase() + facility.slice(1), // Capitalize the first letter
  }));

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Search Home Screen')}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image section */}
        <Image source={{ uri: item.image_path }} style={styles.image} />

        {/* General Info Section */}
        <GeneralLocationInfo
          item={item}
          navigation={navigation}
          reviews={randomReviewsCount}
          rating={averageRating} // Pass the calculated average rating
        />

        {/* Separator Line */}
        <View style={styles.separator} />
        <FacilitiesAndServices accommodation={{ ...item, facilities: formattedFacilitiesData }} navigation={navigation} />
        {/* Separator Line */}
        <View style={styles.separator} />
        {/* Pass randomReviewsCount and averageRating to Reviews */}
        <Reviews
          navigation={navigation}
          reviewsCount={randomReviewsCount}
          rating={averageRating} // Pass the calculated average rating
        />
        {/* Separator Line */}
        <View style={styles.separator} />
        <Policies />
        <View style={styles.separator} />
        {/* Pass item to Description */}
        <Description accommodation={item} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerPrice}>{item.price}</Text> {/* Added dollar sign for price */}
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={() =>
            navigation.navigate('Confirm And Pay Screen', { item, navigation })
          }
        >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  bookNowButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bookNowText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
