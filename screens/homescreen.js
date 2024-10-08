import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';

const DATA = [
  {
    id: '1',
    title: 'Apartment in Omaha',
    location: 'Beach',
    price: '$20/night',
    rating: 5.0,
    image: require('../assets/images/pictures/omaha-apartment.jpg'),
  },
  {
    id: '2',
    title: 'Apartment in San Jose',
    location: 'Mountain',
    price: '$28/night',
    rating: 4.5,
    image: require('../assets/images/pictures/san-joe-apartment.jpg'),
  },
  {
    id: '3',
    title: 'Apartment in Miami',
    location: 'Beach',
    price: '$35/night',
    rating: 4.7,
    image: require('../assets/images/pictures/miami-apartment.jpg'),
  },
  {
    id: '4',
    title: 'Cabin in Aspen',
    location: 'Mountain',
    price: '$50/night',
    rating: 4.8,
    image: require('../assets/images/pictures/aspen-cabin.jpg'),
  },
  {
    id: '5',
    title: 'Tent in Yosemite',
    location: 'Camping',
    price: '$10/night',
    rating: 4.0,
    image: require('../assets/images/pictures/yosemite-tent.jpg'),
  },
];

export default function HomeScreen() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const filteredData = DATA.filter(
    (item) =>
      (selectedLocations.length === 0 ||
        selectedLocations.includes(item.location)) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <View style = {styles.titleRow}>
        <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>        
      </View>
      <TouchableOpacity style={styles.favoriteIcon}>
        <Image
          source={require('../assets/images/icons/heart.svg')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={mainStyle.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Where do you want to stay?"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedLocations.includes('Beach') && styles.tabItemActive,
          ]}
          onPress={() => toggleLocation('Beach')}>
          <Text
            style={
              selectedLocations.includes('Beach')
                ? styles.tabTextActive
                : styles.tabText
            }>
            Beach
          </Text>
          <Image
            source={require('../assets/images/icons/beach.svg')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedLocations.includes('Mountain') && styles.tabItemActive,
          ]}
          onPress={() => toggleLocation('Mountain')}>
          <Text
            style={
              selectedLocations.includes('Mountain')
                ? styles.tabTextActive
                : styles.tabText
            }>
            Mountain
          </Text>
          <Image
            source={require('../assets/images/icons/mountain.svg')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedLocations.includes('Camping') && styles.tabItemActive,
          ]}
          onPress={() => toggleLocation('Camping')}>
          <Text
            style={
              selectedLocations.includes('Camping')
                ? styles.tabTextActive
                : styles.tabText
            }>
            Camping
          </Text>
          <Image
            source={require('../assets/images/icons/camping.svg')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* List of Apartments */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/search.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navTextActive}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/heart.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/booking.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/inbox.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/profile.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 25,
    margin: 15,
  },
  icon: {
    width: 20, // Chiều rộng 20
    height: 20, // Chiều cao 20
    marginLeft: 5, // Thêm khoảng cách nếu cần thiết
  },
  searchInput: {
    flex: 1,
    color: '#333',
    paddingLeft: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#e0f7fa',
    borderRadius: 20,
  },
  tabText: {
    color: '#888',
    marginRight: 10,
  },
  tabTextActive: {
    color: '#00BCD4',
    fontWeight: 'bold',
    marginRight: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    color: '#888',
    marginVertical: 5,
  },
  bottomRow: {
    flexDirection: 'column', // Change this to 'column' for vertical stacking
    justifyContent: 'flex-start',
  },

  rating: {
    color: '#FFD700',
  },
  price: {
    color: '#00BCD4',
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
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
    color: '#00BCD4',
    fontWeight: 'bold',
  },
});
