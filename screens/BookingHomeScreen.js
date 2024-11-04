import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import { ActiveTabContext } from '../ActiveTabContext'; // Import the context
import BottomNavigation from '../assets/components/BottomNavigation';

const BookingHomeScreen = ({
  navigation,
  route,
  accUserRelations = [],
  user,
  accommodations,
}) => {
  const { setActiveTab } = useContext(ActiveTabContext); // Access setActiveTab from context
  const [hoveredId, setHoveredId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Set the active tab to "Bookings" when the component mounts
    setActiveTab('Bookings');
  }, [setActiveTab]); // Dependency array includes setActiveTab to avoid warnings

  useEffect(() => {
    // Filter the accommodations based on accUserRelations
    const newFilteredData = accommodations.filter((item) =>
      accUserRelations.some(
        (relation) =>
          relation.acc_id === item.id &&
          relation.user_id === user.id &&
          relation.amount !== null &&
          relation.amount !== 0
      )
    );
    setFilteredData(newFilteredData);
  }, [accUserRelations, accommodations, user.id]);

  const renderItem = ({ item }) => {
    const paymentInfo = accUserRelations.find(
      (relation) => relation.acc_id === item.id && relation.user_id === user.id
    );

    const amount = paymentInfo ? paymentInfo.amount : 'Not Applicable';
    const bookingDate = paymentInfo
      ? `${new Date(paymentInfo.date).toLocaleDateString('en-CA')} at ${new Date(paymentInfo.date).toLocaleTimeString('en-CA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}`
      : 'Not Applicable';

    return (
      <Pressable
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={[styles.card, hoveredId === item.id && styles.cardHovered]}
        onPress={() =>
          navigation.navigate('Booking Location Detail Screen', {
            item,
            user,
            accUserRelations,
          })
        }>
        <Image source={item.image_path} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconRow}>
            <Icon name="dollar" size={18} color="#00AEEF" />
            <Text style={styles.amount}>{amount}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="star" size={18} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="flag" size={18} color="gray" />
            <Text style={styles.country}>
              {item.country} - {item.location}
            </Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="home" size={18} color="gray" />
            <Text style={styles.infoText}>{item.type}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="users" size={18} color="gray" />
            <Text style={styles.infoText}>Guests: {item.total_guests}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="bed" size={18} color="gray" />
            <Text style={styles.infoText}>
              {item.beds} beds, {item.bedroom} bedrooms
            </Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="shower" size={18} color="gray" />
            <Text style={styles.infoText}>{item.bathroom} bathrooms</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="calendar" size={18} color="gray" />
            <Text style={styles.infoText}>Booking: {bookingDate}</Text>
          </View>
          <View style={styles.iconRow}>
            <Icon name="clock-o" size={18} color="gray" />
            <Text style={styles.infoText}>
              {new Date(item.start_date).toLocaleDateString('en-CA')} to{' '}
              {new Date(item.end_date).toLocaleDateString('en-CA')}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={mainStyle.container}>
      <Text style={styles.heading}>Your Bookings</Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
      {filteredData.length === 0 && (
        <Text style={styles.noBookingsText}>No bookings found!</Text>
      )}
      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardHovered: {
    borderColor: '#00AEEF',
    shadowColor: '#00AEEF',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    color: '#00AEEF',
    marginLeft: 10,
  },
  rating: {
    marginLeft: 10,
    color: 'gray',
  },
  country: {
    marginLeft: 10,
    color: 'gray',
  },
  infoText: {
    marginLeft: 10,
    color: 'gray',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  noBookingsText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'gray',
  },
});

export default BookingHomeScreen;
