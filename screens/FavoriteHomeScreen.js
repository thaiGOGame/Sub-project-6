import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity, Pressable
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';

export default function FavoriteHomeScreen({ navigation, data, updateData }) {
  const [items, setItems] = useState(data);
  const [hoveredId, setHoveredId] = useState(null);
  const toggleFavourite = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, favourite: !item.favourite };
      }
      return item;
    });

    setItems(updatedItems);
    updateData(updatedItems); // Cập nhật data gốc
  };

  const favoriteItems = items.filter((item) => item.favourite);

  const renderItem = ({ item }) => (
    <Pressable
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={[
          styles.card,
          hoveredId === item.id && styles.cardHovered,
        ]}
      onPress={() => navigation.navigate('Location Detail Screen', { item })} // Navigate to LocationDetailScreen
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {item.title} of {item.country}
          </Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={styles.location}>{item.type}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => toggleFavourite(item.id)}>
        <Image
          source={
            item.favourite
              ? require('../assets/images/icons/pink-heart.svg') // Pink heart for favourites
              : require('../assets/images/icons/white_heart.svg') // White heart for non-favourites
          }
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={mainStyle.container}>
      <Text style={styles.heading}>Place your favourite</Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Chắc chắn rằng id là chuỗi
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true} // Hiển thị thanh cuộn
      />
      {favoriteItems.length === 0 && (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      )}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search Home Screen')}
          style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/search.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorite Home Screen')}
          style={styles.navItem}>
          <Image
            source={require('../assets/images/icons/white_heart.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navTextActive}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Booking Home Screen')}>
          <Image
            source={require('../assets/images/icons/booking.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Inbox Home Screen')}>
          <Image
            source={require('../assets/images/icons/inbox.svg')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile Home Screen')}>
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
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap:20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardHovered: {
    borderColor: '#00AEEF', // Viền đèn LED khi hover
    shadowColor: '#00AEEF',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  location: {
    color: '#888',
    marginVertical: 5,
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
