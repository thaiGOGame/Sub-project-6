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

export default function ChangeInformationScreen({ navigation, route, setUser }) {
  const { user } = route.params; // Get user from route params
  const userId = user ? user.id : null; // Safely access user ID

  const [fullName, setFullName] = useState(user.full_name || '');
  const [imagePath, setImagePath] = useState(user.image_path || '');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    if (!isError) { // Navigate only if there is no error
      navigation.navigate('Profile Home Screen', { user: { ...user, full_name: fullName, image_path: imagePath } });
    }
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    if (!userId) {
      setModalMessage('User information is missing. Please log in again.');
      setIsModalVisible(true);
      return;
    }

    setIsLoading(true);
    setIsError(false); // Reset error state before saving
    try {
      const response = await fetch('http://localhost:5000/update-information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, imagePath, userId }), // Include userId in the request body
      });

      const data = await response.json();

      if (response.ok) {
        // Update user state globally
        setUser({ ...user, full_name: fullName, image_path: imagePath });

        setModalMessage('Information updated successfully!');
      } else {
        setIsError(true);
        setModalMessage(data.message || 'Failed to update information.');
      }
    } catch (error) {
      setIsError(true);
      setModalMessage('An error occurred while updating information: ' + error.message);
    } finally {
      setIsLoading(false);
      setIsModalVisible(true);
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
      <Text style={mainStyle.bold_text}>Change Information</Text>
        
      <View style={mainStyle.width_full}>
        <Text>Full Name:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={mainStyle.width_full}>
        <Text>Image Path:</Text>
        <TextInput
          style={mainStyle.input}
          placeholder="Enter image path"
          value={imagePath}
          onChangeText={setImagePath}
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={[mainStyle.aqua_button, mainStyle.row_center_flex]}>
        <Text style={{ color: 'white' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Add any additional styles here if needed
});
