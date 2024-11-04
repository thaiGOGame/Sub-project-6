import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import BottomNavigation from '../assets/components/BottomNavigation';

const ProfileHomeScreen = ({ navigation, user }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <View style={mainStyle.container}>
      <TouchableOpacity
        style={[styles.profileContainer, hovered && styles.profileContainerHovered]}
        onPressIn={() => setHovered(true)}
        onPressOut={() => setHovered(false)}
        onPress={() => navigation.navigate("Change Information Screen",{user})}
      >
        <Image
          source={user?.image_path ? { uri: user.image_path } : require('../assets/images/icons/default-avatar.png')}
          style={styles.avatar}
        />
        <Text style={mainStyle.bold_text}>{user?.full_name || "Guest User"}</Text>
        <Text style={mainStyle.text}>Email: {user?.email || "Not provided"}</Text>
        <Text style={mainStyle.text}>Phone: {user?.phone_number || "Not provided"}</Text>
        <Text style={mainStyle.text}>Nation: {user?.nation || "Not provided"}</Text>
        <Text style={styles.footerText}>Made by IUH TPHCM 2024</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[mainStyle.aqua_button, styles.buttonSpacing]}
        onPress={() => navigation.navigate("Change Password Screen",{user})}
      >
        <Text style={mainStyle.button_text}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.navigate("Login Screen");
        }}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Add BottomNavigation component */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileContainerHovered: {
    borderColor: '#00BCD4',
    borderWidth: 2,
    shadowColor: '#00BCD4',
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
    borderColor: '#00BCD4',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonSpacing: {
    marginBottom: 15,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9534f',
  },
  logoutText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
});

export default ProfileHomeScreen;
