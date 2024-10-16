import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import BeginScreen from './screens/BeginScreen.js';
import CreateAccountScreen from './screens/CreateAnAccountScreen.js';
import SearchHomeScreen from './screens/SearchHomeScreen';
import SearchScreen from './screens/SearchScreen.js';
import FavoriteHomeScreen from './screens/FavoriteHomeScreen';
import LocationDetailScreen from './screens/LocationDetailScreen';
import FacilitiesAndServicesScreen from './screens/FacilitiesAndServicesScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
import ConfirmAndPayScreen from './screens/ConfirmAndPayScreen';
import BookingHomeScreen from './screens/BookingHomeScreen';
import BookingLocationDetailScreen from './screens/BookingLocationDetailScreen';
import ProfileHomeScreen from './screens/ProfileHomeScreen';
import InboxHomeScreen from './screens/InboxHomeScreen';
const Stack = createNativeStackNavigator();
const DATA = [
  // North America
  {
    id: '1',
    title: 'Apartment',
    country: 'Omaha',
    location: 'North America',
    type: 'Beach',
    price: '$20/night',
    rating: 5.0,
    image: require('./assets/images/pictures/omaha-apartment.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 3,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 2,
      beds: 3,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '2',
    title: 'Apartment',
    country: 'San Jose',
    location: 'North America',
    type: 'Mountain',
    price: '$28/night',
    rating: 4.5,
    image: require('./assets/images/pictures/san-joe-apartment.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 6,
    favourite: false,
    typeOfPlace: 'Private room',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['pool', 'gym'],
    taxInclusive: true,
  },
  {
    id: '3',
    title: 'Cabin',
    country: 'Aspen',
    location: 'North America',
    type: 'Mountain',
    price: '$50/night',
    rating: 4.8,
    image: require('./assets/images/pictures/aspen-cabin.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 5,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 3,
      beds: 5,
      bathroom: 2,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '4',
    title: 'Tent',
    country: 'Yosemite',
    location: 'North America',
    type: 'Camping',
    price: '$10/night',
    rating: 4.0,
    image: require('./assets/images/pictures/yosemite-tent.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 3,
    favourite: false,
    typeOfPlace: 'Dormitories',
    roomsAndBeds: {
      bedroom: 1,
      beds: 3,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '5',
    title: 'Luxury Suite',
    country: 'Toronto',
    location: 'North America',
    type: 'Urban',
    price: '$120/night',
    rating: 4.9,
    image: require('./assets/images/pictures/toronto-suite.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 2,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['pool', 'gym', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '6',
    title: 'Beach House',
    country: 'Miami',
    location: 'North America',
    type: 'Beach',
    price: '$150/night',
    rating: 4.7,
    image: require('./assets/images/pictures/miami-beach-house.jpg'),
    startDate: '2024-11-01',
    endDate: '2024-11-08',
    totalGuests: 8,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 4,
      beds: 8,
      bathroom: 3,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: true,
  },

  // Asia
  {
    id: '7',
    title: 'Apartment',
    country: 'Tokyo',
    location: 'Asia',
    type: 'Beach',
    price: '$45/night',
    rating: 4.9,
    image: require('./assets/images/pictures/tokyo-apartment.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 2,
    favourite: true,
    typeOfPlace: 'Private room',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '8',
    title: 'Villa',
    country: 'Bali',
    location: 'Asia',
    type: 'Beach',
    price: '$85/night',
    rating: 4.8,
    image: require('./assets/images/pictures/bali-villa.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 4,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 3,
      beds: 6,
      bathroom: 2,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '9',
    title: 'Traditional House',
    country: 'Kyoto',
    location: 'Asia',
    type: 'Cultural',
    price: '$60/night',
    rating: 4.6,
    image: require('./assets/images/pictures/kyoto-house.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 3,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 2,
      beds: 3,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: false,
  },

  // Europe
  {
    id: '10',
    title: 'Apartment',
    country: 'Paris',
    location: 'Europe',
    type: 'Mountain',
    price: '$55/night',
    rating: 4.6,
    image: require('./assets/images/pictures/paris-apartment.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 4,
    favourite: false,
    typeOfPlace: 'Private room',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '11',
    title: 'Chateau',
    country: 'Nice',
    location: 'Europe',
    type: 'Luxury',
    price: '$300/night',
    rating: 5.0,
    image: require('./assets/images/pictures/nice-chateau.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 10,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 5,
      beds: 10,
      bathroom: 4,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '12',
    title: 'Cabin',
    country: 'Swiss Alps',
    location: 'Europe',
    type: 'Mountain',
    price: '$150/night',
    rating: 4.7,
    image: require('./assets/images/pictures/swiss-alps-cabin.jpg'),
    startDate: '2024-11-16',
    endDate: '2024-11-23',
    totalGuests: 6,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 3,
      beds: 6,
      bathroom: 2,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: true,
  },

  // Africa
  {
    id: '13',
    title: 'Cabin',
    country: 'Cape Town',
    location: 'Africa',
    type: 'Camping',
    price: '$60/night',
    rating: 4.8,
    image: require('./assets/images/pictures/cape-town-cabin.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12- 08',
    totalGuests: 5,
    favourite: false,
    typeOfPlace: 'Dormitories',
    roomsAndBeds: {
      bedroom: 1,
      beds: 5,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '14',
    title: 'Safari Lodge',
    country: 'Kenya',
    location: 'Africa',
    type: 'Luxury',
    price: '$250/night',
    rating: 4.9,
    image: require('./assets/images/pictures/kenya-lodge.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    totalGuests: 4,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 2,
      beds: 4,
      bathroom: 2,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '15',
    title: 'Beach Hut',
    country: 'Zanzibar',
    location: 'Africa',
    type: 'Beach',
    price: '$70/night',
    rating: 4.4,
    image: require('./assets/images/pictures/zanzibar-hut.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    totalGuests: 3,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 1,
      beds: 3,
      bathroom: 1,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: false,
  },

  // South America
  {
    id: '16',
    title: 'Tent',
    country: 'Rio de Janeiro',
    location: 'South America',
    type: 'Camping',
    price: '$25/night',
    rating: 4.2,
    image: require('./assets/images/pictures/rio-tent.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 3,
    favourite: true,
    typeOfPlace: 'Dormitories',
    roomsAndBeds: {
      bedroom: 1,
      beds: 3,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '17',
    title: 'Apartment',
    country: 'Buenos Aires',
    location: 'South America',
    type: 'Urban',
    price: '$30/night',
    rating: 4.3,
    image: require('./assets/images/pictures/buenos-aires-apartment.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 4,
    favourite: false,
    typeOfPlace: 'Private room',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '18',
    title: 'Cabin',
    country: 'Machu Picchu',
    location: 'South America',
    type: 'Cultural',
    price: '$80/night',
    rating: 4.8,
    image: require('./assets/images/pictures/machu-picchu-cabin.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 2,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: true,
  },

  // Oceania
  {
    id: '19',
    title: 'Apartment',
    country: 'Sydney',
    location: 'Oceania',
    type: 'Beach',
    price: '$70/night',
    rating: 4.7,
    image: require('./assets/images/pictures/sydney-apartment.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 4,
    favourite: false,
    typeOfPlace: 'Private room',
    roomsAndBeds: {
      bedroom: 1,
      beds: 2,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '20',
    title: 'Resort',
    country: 'Fiji',
    location: 'Oceania',
    type: 'Beach',
    price: '$150/night',
    rating: 5.0,
    image: require('./assets/images/pictures/fiji-resort.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 8,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 4,
      beds: 8,
      bathroom: 3,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: true,
  },
  {
    id: '21',
    title: 'Cottage',
    country: 'Queenstown',
    location: 'Oceania',
    type: 'Mountain',
    price: '$90/night',
    rating: 4.5,
    image: require('./assets/images/pictures/queenstown-cottage.jpg'),
    startDate: '2024-12-16',
    endDate: '2024-12-23',
    totalGuests: 5,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 2,
      beds: 5,
      bathroom: 2,
    },
    facilities: ['outdoor space', 'wifi'],
    taxInclusive: true,
  },
  // Vietnam
  {
    id: '22',
    title: 'Beachfront Villa',
    country: 'Vietnam',
    location: 'Asia',
    type: 'Beach',
    price: '$120/night',
    rating: 4.8,
    image: require('./assets/images/pictures/da-nang-villa.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    totalGuests: 6,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 3,
      beds: 6,
      bathroom: 2,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '23',
    title: 'Traditional House',
    country: 'Vietnam',
    location: 'Asia',
    type: 'Cultural',
    price: '$40/night',
    rating: 4.6,
    image: require('./assets/images/pictures/hanoi-house.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    totalGuests: 4,
    favourite: false,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 2,
      beds: 4,
      bathroom: 1,
    },
    facilities: ['kitchen', 'wifi'],
    taxInclusive: false,
  },
  {
    id: '24',
    title: 'Luxury Resort',
    country: 'Vietnam',
    location: 'Asia',
    type: 'Beach',
    price: '$150/night',
    rating: 5.0,
    image: require('./assets/images/pictures/nha-trang-resort.jpg'),
    startDate: '2024-12-01',
    endDate: '2024-12-08',
    totalGuests: 8,
    favourite: true,
    typeOfPlace: 'Entire place',
    roomsAndBeds: {
      bedroom: 4,
      beds: 8,
      bathroom: 3,
    },
    facilities: ['pool', 'gym', 'outdoor space', 'wifi'],
    taxInclusive: false,
  },
];


export default function App() {
  const [data, setData] = useState(DATA);
  const [paymentData, setPaymentData] = useState([
    { id: '24', amount: '1200', date: '2024-11-16', time: '12:00 PM' },
    { id: '11', amount: '300', date: '2024-11-13', time: '12:00 PM' },
    { id: '22', amount: '1200', date: '2024-11-14', time: '12:00 PM' },
    { id: '12', amount: '300', date: '2024-11-15', time: '12:00 PM' },
  ]);
  const updateData = (updatedItems) => {
    setData(updatedItems);
  };
  const handleUnbook = (id) => {
  setPaymentData((prevData) => prevData.filter((payment) => payment.id !== id));
};
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Search Home Screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Begin Screen" component={BeginScreen} />
        <Stack.Screen
          name="Create An Account Screen"
          component={CreateAccountScreen}
        />
        <Stack.Screen name="Favorite Home Screen">
          {(props) => (
            <FavoriteHomeScreen
              {...props}
              data={data}
              updateData={updateData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Search Home Screen">
          {(props) => (
            <SearchHomeScreen {...props} data={data} updateData={updateData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Booking Home Screen">
          {(props) => (
            <BookingHomeScreen
              {...props}
              data={data}
              paymentData={paymentData}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Facilities And Services Screen"
          component={FacilitiesAndServicesScreen}
        />
        <Stack.Screen name="Search Screen" component={SearchScreen} />
        <Stack.Screen name="Reviews Screen" component={ReviewsScreen} />
        <Stack.Screen name="Booking Location Detail Screen">
          {(props) => (
            <BookingLocationDetailScreen
              {...props}
              paymentData={paymentData}
              onUnbook={handleUnbook} // Pass the unbook function
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Payment Success Screen"
          component={PaymentSuccessScreen}
        />
        <Stack.Screen name="Confirm And Pay Screen">
          {(props) => (
            <ConfirmAndPayScreen {...props} paymentData={paymentData} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Location Detail Screen"
          component={LocationDetailScreen}
        />
        <Stack.Screen
          name="Profile Home Screen"
          component={ProfileHomeScreen}
        /><Stack.Screen
          name="Inbox Home Screen"
          component={InboxHomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
