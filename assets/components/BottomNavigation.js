import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActiveTabContext } from '../../ActiveTabContext'; // Import the context

const BottomNavigation = ({ navigation }) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext); // Access context state

  const handleTabPress = (screen, tabName) => {
    setActiveTab(tabName);
    navigation.navigate(screen);
  };
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress('Search Home Screen', 'Search')}
      >
        <Icon
          name="search" // Ionicon name for search
          size={24}
          color={activeTab === 'Search' ? '#00BCD4' : '#888'} // Change color based on active tab
        />
        <Text style={[styles.navText, activeTab === 'Search' && styles.navTextActive]}>
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress('Favorite Home Screen', 'Favorites')}
      >
        <Icon
          name="heart" // Ionicon name for favorites
          size={24}
          color={activeTab === 'Favorites' ? '#00BCD4' : '#888'}
        />
        <Text style={[styles.navText, activeTab === 'Favorites' && styles.navTextActive]}>
          Favorites
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress('Booking Home Screen', 'Bookings')}
      >
        <Icon
          name="clipboard" // Ionicon name for bookings
          size={24}
          color={activeTab === 'Bookings' ? '#00BCD4' : '#888'}
        />
        <Text style={[styles.navText, activeTab === 'Bookings' && styles.navTextActive]}>
          Bookings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress('Inbox Home Screen', 'Inbox')}
      >
        <Icon
          name="mail" // Ionicon name for inbox
          size={24}
          color={activeTab === 'Inbox' ? '#00BCD4' : '#888'}
        />
        <Text style={[styles.navText, activeTab === 'Inbox' && styles.navTextActive]}>
          Inbox
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress('Profile Home Screen', 'Profile')}
      >
        <Icon
          name="person" // Ionicon name for profile
          size={24}
          color={activeTab === 'Profile' ? '#00BCD4' : '#888'}
        />
        <Text style={[styles.navText, activeTab === 'Profile' && styles.navTextActive]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888', // Default text color
  },
  navTextActive: {
    color: '#00BCD4', // Aqua color for active text
  },
});

export default BottomNavigation;
