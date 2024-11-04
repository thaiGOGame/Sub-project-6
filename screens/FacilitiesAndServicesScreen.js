import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

export default function FacilitiesAndServicesScreen({ navigation, route }) {
  // Get the item from route.params, with a fallback to an empty object
 const { accommodation } = route.params; // Get the whole accommodation object
 const {
    facilities = [],
    total_guests = 0,
    bedroom = 0,
    beds = 0,
    bathroom = 0,
  } = accommodation; // Destructure properties

  // Mapping of facilities to Unicode characters or emojis
  const iconMap = {
    kitchen: '🍽️', // Fork and knife
    pool: '🏊', // Person swimming
    gym: '🏋️‍♂️', // Weight lifter
    outdoorSpace: '🌳', // Deciduous tree
    wifi: '📶', // Wi-Fi signal
  };

  const facilitiesData =
    facilities?.map((facility) => ({
      icon: iconMap[facility.icon] || '❓', // Use icon from formatted facilities
      title: facility.title, // Already formatted
    })) || [];

  // Sample data for services
  const servicesData = {
    'Cleaning & Laundry': [
      'Washer',
      'Free dryer - In unit',
      'Ironing service',
      'Dry cleaning service',
    ],
    Bathroom: ['Bathtub', 'Hair dryer', 'Shower gel', 'Towels'],
    Kitchen: ['Microwave', 'Coffee maker', 'Refrigerator', 'Cookware'],
    Entertainment: ['TV', 'Cable channels', 'Streaming services'],
    Outdoor: ['BBQ grill', 'Outdoor furniture', 'Garden'],
  };
  // Render each service item with a title
  const renderServiceItem = (title, items) => (
    <View style={styles.serviceContainer} key={title}>
      <Text style={styles.serviceTitle}>{title}</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${title}-${index}`} // Ensure unique keys
        renderItem={({ item }) => (
          <Text style={styles.serviceItem}>- {item}</Text>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Facilities and Services</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Display accommodation image */}
        <Text style={styles.subHeader}>Facilities</Text>

        <View style={[styles.summaryContainer, { marginLeft: 5 }]}>
          <Text style={styles.summaryText}>
            {total_guests} guest{total_guests !== 1 && 's'}, {beds} bed
            {beds !== 1 && 's'}, {bedroom} bedroom{bedroom !== 1 && 's'},{' '}
            {bathroom} bathroom{bathroom !== 1 && 's'}
          </Text>
        </View>

        <FlatList
        data={facilitiesData} // Show only a few facilities
        keyExtractor={(facility) => facility.title}
        renderItem={({ item }) => (
          <View style={styles.facilityItem}>
            <Text style={styles.iconText}>{item.icon}</Text>{' '}
            {/* Use text for emoji */}
            <Text style={styles.facilityText}>{item.title}</Text>
          </View>
        )}
      />

        <Text style={styles.subHeader}>Services</Text>
        {Object.entries(servicesData).map(([title, items]) =>
          renderServiceItem(title, items)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff', // Set background color to white
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    backgroundColor: '#f0f0f0', // Background color of the button
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add some shadow for Android
  },
  backButtonText: {
    fontSize: 24, // Size of the back arrow
  },
  scrollContainer: {
    marginTop: 20, // To prevent the content from being under the back button
    paddingRight: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1, // Add a bottom border for separation
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20, // Increase the size of the icon text
  },
  facilityText: {
    marginLeft: 10,
    fontSize: 16,
  },
  serviceContainer: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9', // Light gray background for service sections
    padding: 10, // Add padding around the service container
    borderRadius: 5, // Add rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // Add shadow for Android
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceItem: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5, // Add spacing between items
  },
  summaryText: {
    fontSize: 14,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20, // Space between the back button and the title
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted for alignment
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});
