import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import LoadingModal from '../assets/components/LoadingModal';
import MessageModal from '../assets/components/MessageModal';

export default function ChangePasswordScreen({ navigation, user, setUser }) {
  const userId = user ? user.id : null; // Safely access user ID

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (!isError) { // Navigate only if there is no error
      navigation.navigate('Profile Home Screen'); // Optional: navigate on successful password change
    }
  };

  const handleChangePassword = async () => {
    if (!userId) {
      setModalMessage('User information is missing. Please log in again.');
      setIsModalVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
          userId: userId,
        }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setIsError(false);
        setModalMessage(data.message || 'Password changed successfully!');
        setUser({ ...user, password: newPassword }); // Update user state
      } else {
        setIsError(true);
        const errorMessage = data.message || 'An error occurred. Please try again.';
        console.error('Error changing password:', errorMessage);
        setModalMessage(errorMessage);
      }

      setIsModalVisible(true); // Show modal after handling response
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      const errorMessage = error.message || 'An unexpected error occurred.';
      console.error('Fetch error:', errorMessage);
      setModalMessage(errorMessage);
      setIsModalVisible(true); // Show modal on error
    }
  };

  return (
    <View style={[mainStyle.container, mainStyle.column_left_flex]}>
      <LoadingModal isLoading={isLoading} />
      <MessageModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        isError={isError}
        message={modalMessage}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={mainStyle.back_button}>
        <Text style={mainStyle.back_button_text}>← Back</Text>
      </TouchableOpacity>
      <Text style={mainStyle.bold_text}>Change Password</Text>

      <View style={mainStyle.width_full}>
        <Text>Current Password:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Enter your current password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={mainStyle.width_full}>
        <Text>New Password:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Enter your new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <TouchableOpacity
        onPress={handleChangePassword}
        style={[mainStyle.aqua_button, mainStyle.row_center_flex]}>
        <Text style={{ color: 'white' }}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
