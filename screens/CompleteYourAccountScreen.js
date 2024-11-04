import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import LoadingModal from '../assets/components/LoadingModal';
import MessageModal from '../assets/components/MessageModal';

export default function CompleteYourAccountScreen({ navigation, route }) {
  const { phoneNumber, nation } = route.params;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateAccount = async () => {
    if (
      !fullName ||
      !emailRegex.test(email) ||
      !password ||
      !imagePath ||
      password !== confirmPassword
    ) {
      setIsError(true);
      setModalMessage(
        'Please fill in all fields correctly and ensure passwords match.'
      );
      setIsModalVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          password,
          imagePath,
          phoneNumber,
          nation,
        }),
      });

      const data = await response.json();
      setIsError(response.status !== 201);
      setModalMessage(data.message);
      setIsSuccess(response.ok);

      if (data.fields) {
        const fieldsWithErrors = Object.keys(data.fields).filter(
          (key) => !data.fields[key]
        );
        setModalMessage(`Missing fields: ${fieldsWithErrors.join(', ')}`);
      }

      setIsModalVisible(true);
    } catch (error) {
      setIsError(true);
      setModalMessage(
        'An error occurred while creating the account: ' + error.message
      );
      setIsModalVisible(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    if(isSuccess)
      navigation.navigate('Login Screen'); // Replace with your next screen
  };

  return (
    <View style={[mainStyle.container, mainStyle.column_left_flex]}>
      <LoadingModal
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        successMessage="Account created successfully!"
        errorMessage={modalMessage}
        onClose={handleCloseModal}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={mainStyle.back_button}>
        <Text style={mainStyle.back_button_text}>← Back</Text>
      </TouchableOpacity>
      <Text style={mainStyle.bold_text}>Complete Your Account</Text>
      <ScrollView
        contentContainerStyle={{ padding: 5 }}
        style={mainStyle.width_full}>
        <Text>Nation:</Text>
        <TextInput
          style={[mainStyle.input, mainStyle.lightgray_background]}
          value={nation}
          editable={false}
        />

        <Text>Phone Number:</Text>
        <TextInput
          style={[mainStyle.input, mainStyle.lightgray_background]}
          value={phoneNumber}
          editable={false}
        />

        <Text>Full Name:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text>Email:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text>Image Path:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Image Path"
          value={imagePath}
          onChangeText={setImagePath}
        />

        <Text>Password:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text>Confirm Password:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          onPress={handleCreateAccount}
          style={[mainStyle.aqua_button, mainStyle.row_center_flex]}>
          <Text style={{ color: 'white' }}>Create Account</Text>
        </TouchableOpacity>

        {/* Use the new MessageModal component */}
        <MessageModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          isError={isError}
          isSuccess={isSuccess}
          message={modalMessage}
        />

        <View style={[mainStyle.row_center_flex, { marginTop: 20 }]}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
            <Text style={styles.log_in}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  log_in: { color: 'blue', fontWeight: 'bold' },
});
