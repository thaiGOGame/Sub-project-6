import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import BeginScreen from './screens/BeginScreen.js';
import CreateAccountScreen from './screens/CreateAnAccountScreen.js';
import CompleteYourAccountScreen from './screens/CompleteYourAccountScreen.js';
import LoginScreen from './screens/LoginScreen.js';
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
import ChangeInformationScreen from './screens/ChangeInfomationScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import { ActiveTabProvider } from './ActiveTabContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [accommodations, setAccommodations] = useState([]);
  const [user, setUser] = useState(null);
  const [accUserRelations, setAccUserRelations] = useState([]); // New state to hold acc_user_relations
  useEffect(() => {
    fetch('http://localhost:5000/accommodations') // Replace 'localhost' with your IP address if needed
      .then((response) => response.json())
      .then((data) => setAccommodations(data))
      .catch((error) => console.error(error));

    fetch('http://localhost:5000/acc_user_relations')
      .then((response) => response.json())
      .then((data) => {
        setAccUserRelations(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ActiveTabProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Begin Screen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Begin Screen" component={BeginScreen} />
          <Stack.Screen
            name="Create An Account Screen"
            component={CreateAccountScreen}
          />
          <Stack.Screen
            name="Complete Your Account Screen"
            component={CompleteYourAccountScreen}
          />
          <Stack.Screen name="Login Screen">
            {(props) => <LoginScreen {...props} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Favorite Home Screen">
            {(props) => (
              <FavoriteHomeScreen
                {...props}
                user={user}
                accommodations={accommodations}
                accUserRelations={accUserRelations}
                setAccUserRelations={setAccUserRelations}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Search Home Screen">
            {(props) => (
              <SearchHomeScreen
                {...props}
                user={user}
                accommodations={accommodations}
                accUserRelations={accUserRelations}
                setAccUserRelations={setAccUserRelations}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Booking Home Screen">
            {(props) => (
              <BookingHomeScreen
                {...props}
                user={user}
                accommodations={accommodations}
                accUserRelations={accUserRelations}
                setAccUserRelations={setAccUserRelations}
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
                user={user} accUserRelations = {accUserRelations}
                setAccUserRelations={setAccUserRelations}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Payment Success Screen"
            component={PaymentSuccessScreen}
          />
          <Stack.Screen name="Confirm And Pay Screen">
            {(props) => (
              <ConfirmAndPayScreen
                {...props}
                user={user}
                accUserRelations={accUserRelations}
                setAccUserRelations={setAccUserRelations}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Location Detail Screen"
            component={LocationDetailScreen}
          />
          <Stack.Screen name="Profile Home Screen">
            {(props) => (
              <ProfileHomeScreen {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Inbox Home Screen" component={InboxHomeScreen} />
          <Stack.Screen name="Change Information Screen">
            {(props) => (
              <ChangeInformationScreen
                {...props}
                user={user}
                setUser={setUser}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Change Password Screen">
            {(props) => (
              <ChangePasswordScreen {...props} user={user} setUser={setUser} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ActiveTabProvider>
  );
}
