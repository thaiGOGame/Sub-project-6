import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import BottomNavigation from '../assets/components/BottomNavigation';
import { useIsFocused } from '@react-navigation/native';

export default function FavoriteHomeScreen({
  navigation,
  user,
  accommodations,
  accUserRelations = [], // Set default value to an empty array
  setAccUserRelations,
}) {
  const [items, setItems] = useState(accommodations);
  const [hoveredId, setHoveredId] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const favoriteItems = accommodations.filter((item) =>
        accUserRelations.some(
          (relation) =>
            relation.user_id === user.id &&
            relation.acc_id === item.id &&
            relation.is_favourite == true
        )
      );
      setItems(favoriteItems);
    }
  }, [isFocused, accommodations, accUserRelations]);

  const toggleFavourite = async (id) => {
  try {
    // Determine the new favourite status
    const existingRelation = accUserRelations.find((item) => item.acc_id === id && item.user_id === user.id);
    const newFavouriteStatus = existingRelation ? !existingRelation.is_favourite : true;

    const data = {
      user_id: user.id,
      acc_id: id,
      is_favourite: newFavouriteStatus,
    };

    const response = await fetch(
      'http://localhost:5000/update-acc-relation',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Error updating favourite status');
    }

    // Update state for accUserRelations
    setAccUserRelations((prevRelations) => {
      // If relation exists, update it; otherwise, add a new one
      if (existingRelation) {
        return prevRelations.map((relation) =>
          relation.user_id === data.user_id && relation.acc_id === data.acc_id
            ? { ...relation, ...data }
            : relation
        );
      } else {
        // Add new relation if it doesn't exist
        return [...prevRelations, data];
      }
    });

  } catch (error) {
    alert(error.message);
  }
};

  const getHeartIcon = (id) => {
    const isFavourite = accUserRelations.some(
      (relation) =>
        relation.user_id === user.id &&
        relation.acc_id === id &&
        relation.is_favourite == true
    );
    return isFavourite
      ? require('../assets/images/icons/pink-heart.svg') // Replace with actual heart images
      : require('../assets/images/icons/white_heart.svg');
  };

  const renderItem = ({ item }) => (
    <Pressable
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={[styles.card, hoveredId === item.id && styles.cardHovered]}
      onPress={() => navigation.navigate('Location Detail Screen', { item })}>
      <Image source={item.image_path} style={styles.image} />
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
          source={getHeartIcon(item.id)} // Use the updated function to get the heart icon
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={mainStyle.container}>
      <Text style={styles.heading}>Place your favourite</Text>
      <FlatList
        data={items} // Directly use the items state which already contains favorite items
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
      {items.length === 0 && (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      )}
      <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 20,
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
    borderColor: '#00AEEF',
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
});
