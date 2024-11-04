import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

const FacilitiesAndServices = ({ navigation, accommodation }) => {
  const {
    facilities,
    total_guests,
    bedroom,
    beds,
    bathroom,
  } = accommodation;

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

  // Function to handle the Show All button press
  const toggleShowAll = () => {
    navigation.navigate('Facilities And Services Screen', { accommodation });
  };

  return (
    <View style={styles.facilitiesContainer}>
      <Text style={styles.sectionTitle}>Facilities & Services</Text>
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
      <TouchableOpacity
        style={styles.showAllButton}
        onPress={toggleShowAll} // Use the separate function
      >
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  facilitiesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  facilityText: {
    marginLeft: 10,
    fontSize: 16,
  },
  summaryContainer: {
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  showAllButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showAllText: {
    color: 'black',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default FacilitiesAndServices;
