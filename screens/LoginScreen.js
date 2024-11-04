import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import LoadingModal from '../assets/components/LoadingModal'; // Import LoadingModal
import MessageModal from '../assets/components/MessageModal'; // Import MessageModal

export default function LoginScreen({ navigation,setUser }) {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [isLoading, setIsLoading] = useState(false); // State for loading modal
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // State for error modal
  const [isError, setIsError] = useState(false); // State to determine error/success
  const [message, setMessage] = useState(''); // State for message

  const handleLogin = () => {
    setIsLoading(true); // Show loading modal
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password
    })
      .then((response) => {
        setIsLoading(false); // Hide loading modal

        // Differentiate response errors by status code
        if (response.status === 400) {
          throw new Error('Please provide both email and password.');
        } else if (response.status === 401) {
          throw new Error('Incorrect email or password.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else if (!response.ok) {
          throw new Error('An unexpected error occurred. Please try again.');
        }

        return response.json();
      })
      .then((data) => {
        setIsLoading(false); // Show loading modal
        setUser(data.user); // Update user state in App.js
        setIsError(false); // No error
        setMessage('Login successful!'); // Set success message
        navigation.navigate('Search Home Screen'); // Navigate on successful login
      })
      .catch((error) => {
        // Show specific error message based on the issue
        setIsError(true); // Indicate error
        setIsLoading(false);
        setMessage(error.message); // Display the specific error message
        setIsErrorModalVisible(true); // Show error modal
        console.error('Login Error:', error.message); // Detailed logging in console
      });
  };

  return (
    <View
      style={[
        mainStyle.container,
        mainStyle.column_left_flex,
        mainStyle.space_between_flex,
      ]}>
      <View></View>
      <Text style={mainStyle.bold_text}>Login</Text>

      <View style={[mainStyle.column_left_flex, mainStyle.width_full]}>
        <View style={mainStyle.width_full}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail} // Set email state
          />
        </View>
        <View style={mainStyle.width_full}>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry // Secure text input for password
            value={password}
            onChangeText={setPassword} // Set password state
          />
        </View>
        <View style={{ gap: 5, width: '100%' }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={[mainStyle.aqua_button, mainStyle.row_center_flex]}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
          <View style={mainStyle.row_center_flex}>
            <Text>OR</Text>
          </View>
          {/* Continue with Apple */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Search Home Screen')}
            style={[styles.apple_button, mainStyle.row_center_flex]}>
            <Image
              source={require('../assets/images/icons/apple.svg')}
              style={styles.icon}
            />
            <Text style={styles.appleText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Continue with Facebook */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Search Home Screen')}
            style={[styles.facebook_button, mainStyle.row_center_flex]}>
            <Image
              source={require('../assets/images/icons/facebook.svg')}
              style={styles.icon}
            />
            <Text style={styles.facebookText}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Continue with Google */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Search Home Screen')}
            style={[styles.google_button, mainStyle.row_center_flex]}>
            <Image
              source={require('../assets/images/icons/google.svg')}
              style={styles.icon}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={[mainStyle.column_center_flex, { width: '100%' }]}>
          <Text>By signing up, you agree to our</Text>
          <View style={[mainStyle.row_center_flex, { gap: 4 }]}>
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          mainStyle.row_center_flex,
          { width: '100%', alignSelf: 'flex-end' },
        ]}>
        <Text>Do not have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Create An Account Screen')}>
          <Text style={styles.log_in}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Modal */}
      <LoadingModal isLoading={isLoading} />

      {/* Error Modal */}
      <MessageModal
        visible={isErrorModalVisible}
        onClose={() => setIsErrorModalVisible(false)}
        isError={isError}
        message={message}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  apple_button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    borderRadius: 5,
    padding: 5,
  },
  facebook_button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    width: '100%',
    borderRadius: 5,
    padding: 5,
  },
  google_button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  appleText: {
    color: 'black',
  },
  facebookText: {
    color: 'blue',
  },
  googleText: {
    color: 'red',
  },
  log_in: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
