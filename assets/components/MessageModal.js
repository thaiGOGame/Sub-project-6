import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import mainStyle from '../stylesheet/StyleSheet';

const MessageModal = ({ visible, onClose, isError, message }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={mainStyle.modalContainer}>
        <View style={[mainStyle.modalContent, { backgroundColor: 'white' }]}>
          <Text style={mainStyle.bold_text}>
            {isError ? 'Error' : 'Success'}
          </Text>
          <Text>{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            style={[mainStyle.modal_button, { backgroundColor: isError ? '#d9534f' : '#5cb85c' }]}
          >
            <Text style={mainStyle.button_text}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;