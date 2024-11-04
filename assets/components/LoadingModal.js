import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Text } from 'react-native';

export default function LoadingModal({ isLoading }) {
  return (
    <Modal
      visible={isLoading}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="aqua" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
