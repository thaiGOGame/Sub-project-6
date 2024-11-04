import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';

const Description = ({ accommodation }) => {
  const [showModal, setShowModal] = useState(false);
  const [accommodationDetails, setAccommodationDetails] = useState(null);

  // Load accommodation description data from the API
  useEffect(() => {
    const fetchAccommodationDescription = async () => {
      try {
        const response = await fetch(`http://localhost:5000/accommodation_descriptions/${accommodation.id}`);
        const data = await response.json();
        setAccommodationDetails(data);
      } catch (error) {
        console.error('Error fetching accommodation descriptions:', error);
      }
    };

    fetchAccommodationDescription();
  }, [accommodation.id]); // Reload when accommodation.id changes

  const handleViewMore = () => {
    setShowModal(true);
  };

  // Check if accommodationDetails is loaded
  if (!accommodationDetails) {
    return <Text>Loading...</Text>;
  }

  const { bedroom, beds, bathroom } = accommodation; // Get bedroom, beds, bathroom from accommodation
  const { description, details, image_path } = accommodationDetails; // Get description and details from accommodationDetails

  return (
    <View style={styles.container}>
      <Image source={{ uri: image_path }} style={styles.image} />
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
        <Text style={styles.viewMoreText}>View more</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{accommodation.title}</Text>
          <Image source={{ uri: image_path }} style={styles.image} />
          <Text style={styles.details}>{details}</Text>
          <Text style={{ fontSize: 14 }}>
            {accommodation.total_guests} guest{accommodation.total_guests !== 1 && 's'}, {beds} bed
            {beds !== 1 && 's'}, {bedroom} bedroom{bedroom !== 1 && 's'}, {bathroom} bathroom{bathroom !== 1 && 's'}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.location}>
              <Text style={styles.locationIcon}>📍</Text> {accommodation.location}
            </Text>
            <TouchableOpacity>
              <Text style={styles.openMap}>Open map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bulletPoints}>
            <Text style={styles.bullet}>✔ Consectetur magna consectetur</Text>
            <Text style={styles.bullet}>✔ Voluptate magna fugiat tempor incididunt</Text>
            <Text style={styles.bullet}>✔ Aliqua in in mollit laboris tempor in ut incididunt</Text>
          </View>
          <TouchableOpacity
            style={mainStyle.aqua_button}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  infoRow: {
    gap: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  openMap: {
    color: 'aqua',
    fontSize: 14,
  },
  bulletPoints: {
    marginTop: 10,
  },
  bullet: {
    fontSize: 14,
    marginBottom: 5,
  },
  viewMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'aqua',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Description;
