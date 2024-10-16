import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';

const ProfileHomeScreen = ({ navigation }) => {
  const [hovered, setHovered] = useState(false); // State to manage hover effect
  const studentName = "Lương Quốc Thái"; // Replace with student name
  const studentId = "123456"; // Replace with student ID
  const projectTitle = "Traveling Booking App";

  return (
    <View style={mainStyle.container}>
      <Pressable
        style={[styles.profileContainer, hovered && styles.profileContainerHovered]} // Apply hover style
        onPressIn={() => setHovered(true)} // Set hover state to true on press in
        onPressOut={() => setHovered(false)} // Set hover state to false on press out
      >
        <Image
          source={require('../assets/images/logos/thaiGO-logo.png')} // Replace with avatar path
          style={styles.avatar}
        />
        <Text style={styles.name}>{studentName}</Text>
        <Text style={styles.studentId}>Student ID: {studentId}</Text>
        <Text style={styles.projectTitle}>Project Title: {projectTitle}</Text>
        <Text style={styles.footerText}>Made by IUH TPHCM 2024</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.logoutButtonPressed,
        ]}
        onPress={() => {
          // Add logout logic here
          console.log('Logging out');
        }}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate('Search Home Screen')} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
          <Image
            source={require('../assets/images/icons/search.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Search</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Favorite Home Screen')} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
          <Image
            source={require('../assets/images/icons/white_heart.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Favorites</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Booking Home Screen')} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
          <Image
            source={require('../assets/images/icons/booking.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Bookings</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Inbox Home Screen')} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
          <Image
            source={require('../assets/images/icons/inbox.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Inbox</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profile Home Screen')} style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}>
          <Image
            source={require('../assets/images/icons/profile.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navTextActive}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1, // Allow this part to expand to take space
    backgroundColor: '#f8f8f8', // Light background for profile section
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileContainerHovered: {
    borderColor: '#00BCD4', // Aqua border color on hover
    borderWidth: 2,
    shadowColor: '#00BCD4', // Shadow color on hover
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#00BCD4', // Aqua border for the avatar
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Darker color for text
  },
  studentId: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontStyle: 'italic', // Italic style for project title
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9534f', // Border color for logout button
  },
  logoutButtonPressed: {
    backgroundColor: 'rgba(217, 83, 79, 0.1)', // Light red background when pressed
  },
  logoutText: {
    color: '#d9534f', // Color for logout text
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    alignItems: 'center',
    padding: 5,
  },
  navItemPressed: {
    backgroundColor: 'transparent', // No background on hover
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00FF00', // Green border when hovered
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navText: {
    color: '#888',
  },
  navTextActive: {
    color: '#00BCD4', // Aqua color for active tab
    fontWeight: 'bold',
  },
});

export default ProfileHomeScreen;
