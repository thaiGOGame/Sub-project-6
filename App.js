
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import beginScreen from './screens/beginscreen.js';
import createAccountScreen from './screens/createanaccountscreen.js';
import homeScreen from "./screens/homescreen.js"

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Begin Screen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Begin Screen" component={beginScreen} />
        <Stack.Screen name="Create An Account Screen" component = {createAccountScreen}/>
        <Stack.Screen name="Home Screen" component = {homeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
