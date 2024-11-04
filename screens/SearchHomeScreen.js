import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import mainStyle from '../assets/stylesheet/StyleSheet.js';
import FilterModal from './FilterModal';
import { useIsFocused } from '@react-navigation/native';
import BottomNavigation from '../assets/components/BottomNavigation';

// Thay đổi tham số đầu vào
export default function SearchHomeScreen({
  navigation,
  route,
  accUserRelations = [],
  user,
  accommodations, // Sử dụng accommodations thay cho data
  setAccUserRelations, // Thay đổi tên hàm cập nhật
}) {
  const isFocused = useIsFocused();
  const {
    location: initialLocation = 'Anywhere',
    guests: initialGuests = 'Add guests',
    when: initialWhen = 'Anytime',
  } = route.params || {};

  // Định nghĩa state cho location, guests, và when
  const [location, setLocation] = useState(initialLocation);
  const [guests, setGuests] = useState(initialGuests);
  const [when, setWhen] = useState(initialWhen);
  const [filterByTaxInclusive, setFilterByTaxInclusive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility
  const [hoveredId, setHoveredId] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    bedrooms: -1, // 'x' là giá trị mặc định
    beds: -1, // 'x' là giá trị mặc định
    bathrooms: -1, // 'x' là giá trị mặc định
    facilities: {},
    priceRange: [0, 4000], // Giá trị mặc định cho khoảng giá
    selectedType: '', // 'x' là giá trị mặc định để không lọc theo loại
  });
  useEffect(() => {
    if (isFocused) {
      const updatedItems = accommodations.map((item) => {
        const isFavourite = accUserRelations.some(
          (relation) =>
            relation.user_id === user.id &&
            relation.acc_id === item.id &&
            relation.is_favourite
        );
        return {
          ...item,
          favourite: isFavourite,
        }; // Parse facilities
      });
      setItems(updatedItems);
    }
  }, [isFocused, accommodations, accUserRelations]);

  useEffect(() => {
    if (route.params) {
      const { location, guests, when } = route.params;
      setLocation(location || 'Anywhere');
      setGuests(guests || 'Add guests');
      setWhen(when || 'Anytime');
    }
  }, [route.params]);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const applyFilters = (filters) => {
    setFilterCriteria({
      bedrooms: filters.bedrooms || 'x',
      beds: filters.beds || 'x',
      bathrooms: filters.bathrooms || 'x',
      facilities: filters.facilities || {},
      priceRange: filters.priceRange || [0, 4000],
      selectedType: filters.selectedType || 'x',
    });
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const [items, setItems] = useState(accommodations); // Sử dụng data đã định nghĩa ở trên
  const [selectedLocations, setSelectedLocations] = useState([]);
  // Toggle favourite status function
  // Update the toggleFavourite function
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


  // Ensure the getHeartIcon function reflects the immediate favorite status
  const getHeartIcon = (userId, accId) => {
    const item = items.find((i) => i.id === accId );
    return item && item.favourite
      ? require('../assets/images/icons/pink-heart.svg')
      : require('../assets/images/icons/white_heart.svg');
  };

  useEffect(() => {
    if (route.params?.data) {
      setItems(route.params.data);
    }
  }, [route.params?.data]);
  // Function to filter based on location type and search query
  const filteredData = items.filter(
    (item) =>
      (selectedLocations.length === 0 ||
        selectedLocations.includes(item.type)) &&
      (!filterByTaxInclusive || item.tax_inclusive === false) // Lọc theo trường Tax-inclusive
  );

  const filteredDataWithSearch = (() => {
    // Check if any search criteria are provided
    const hasSearchCriteria =
      (location && location !== 'Anywhere') ||
      (guests && guests !== 'Add guests') ||
      (when && when !== 'Anytime');

    // If no search criteria, return original data
    if (!hasSearchCriteria) {
      return filteredData; // Return the original data if no search criteria are provided
    }

    return filteredData.filter((item) => {
      // Check condition for location
      const locationMatch =
        location === 'Anywhere' ||
        item.location.toLowerCase().includes(location.toLowerCase());

      // Check condition for number of guests
      const guestsMatch =
        guests === 'Add guests' ||
        item.total_guests >= (guests === 'Add guests' ? 0 : guests);

      const datesMatch =
        when === 'Anytime' ||
        (typeof when === 'string' &&
          when !== 'No dates selected' &&
          (() => {
            const [startDate, endDate] = when.split(' to ');

            // Lấy itemStartDate và chuyển đổi sang ngày địa phương
            const itemStartDate = new Date(item.start_date); // Lấy ngày từ item
            const localItemDate = itemStartDate.toLocaleDateString('en-CA'); // Chuyển đổi sang định dạng ngày địa phương (YYYY-MM-DD)

            // Lấy ngày bắt đầu và kết thúc
            const localStartDate = new Date(startDate).toLocaleDateString(
              'en-CA'
            );
            const localEndDate = new Date(endDate).toLocaleDateString('en-CA');

            return (
              localItemDate >= localStartDate && // So sánh ngày item với ngày bắt đầu
              localItemDate <= localEndDate // So sánh ngày item với ngày kết thúc
            );
          })());

      return locationMatch && guestsMatch && datesMatch;
    });
  })();

  const filteredDataWithFilter = (() => {
    // Check if any filter criteria are provided
    const hasFilterCriteria =
      filterCriteria.bedrooms !== -1 ||
      filterCriteria.beds !== 'x' ||
      filterCriteria.bathrooms !== 'x' ||
      Object.values(filterCriteria.facilities).some(Boolean) ||
      filterCriteria.priceRange[0] !== 0 ||
      filterCriteria.priceRange[1] !== Infinity ||
      (filterCriteria.selectedType !== 'x' &&
        filterCriteria.selectedType !== '');

    // If no filter criteria, return original filtered data
    if (!hasFilterCriteria) {
      return filteredDataWithSearch; // Return the original data if no filter criteria are provided
    }

    const result = [];

    filteredDataWithSearch.forEach((item) => {
      // Extract room and bed data from item.roomsAndBeds
      const bedroom = item.bedroom;
      const beds = item.beds;
      const bathroom = item.bathroom;

      // Initialize a flag to check if all conditions are met
      let allConditionsMet = true;

      // Apply room and bed filters (skip if -1)
      if (
        !(filterCriteria.bedrooms === -1 || bedroom >= filterCriteria.bedrooms)
      ) {
        allConditionsMet = false;
      }
      if (!(filterCriteria.beds === 'x' || beds >= filterCriteria.beds)) {
        allConditionsMet = false;
      }
      if (
        !(
          filterCriteria.bathrooms === 'x' ||
          bathroom >= filterCriteria.bathrooms
        )
      ) {
        allConditionsMet = false;
      }
      Object.keys(filterCriteria.facilities).forEach((facility) => {
        const normalizedFacility = facility.toLowerCase().trim();

        // Parse item.facilities từ JSON và chuẩn hóa các giá trị nếu là chuỗi
        const itemFacilities = Object.values(JSON.parse(item.facilities)).map(
          (f) => (typeof f === 'string' ? f.toLowerCase().trim() : '')
        );

        if (
          filterCriteria.facilities[normalizedFacility] &&
          !itemFacilities.includes(normalizedFacility)
        ) {
          allConditionsMet = false;
        }
      });

      // Extract price and format it for comparison (remove '$' and '/night')
      const price = parseFloat(
        item.price.replace('$', '').split('/')[0].trim()
      );

      // Apply price range filters
      if (
        !(
          price >= filterCriteria.priceRange[0] &&
          price <= filterCriteria.priceRange[1]
        )
      ) {
        allConditionsMet = false;
      }

      // Apply type filter (skip if empty or 'x'), compare lowercase without spaces
      const selectedType = filterCriteria.selectedType.toLowerCase().trim();
      const itemType = item.type_of_place.toLowerCase().trim();
      if (
        !(
          selectedType === 'x' ||
          selectedType === '' ||
          itemType === selectedType
        )
      ) {
        allConditionsMet = false;
      }

      // If all conditions are met, add the item to the result
      if (allConditionsMet) {
        result.push(item);
      }
    });

    return result;
  })();
  const valueChoiceText = () => {
    const dateText = when === 'Anytime' ? 'Anytime' : when; // Kiểm tra nếu là "Anytime" để gán giá trị 'Anytime', nếu không lấy giá trị khi chọn
    const guestsText =
      guests === 'Add guests' ? 'No limit quests' : `${guests} Guests`;
    return `🔍 ${location || 'Anywhere'} - ${dateText} - ${guestsText}`;
  };

  const toggleLocation = (locationType) => {
    if (selectedLocations.includes(locationType)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== locationType));
    } else {
      setSelectedLocations([...selectedLocations, locationType]);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={[styles.card, hoveredId === item.id && styles.cardHovered]}
      onPress={() => navigation.navigate('Location Detail Screen', { item })}>
      <Image source={{ uri: item.image_path }} style={styles.image} />
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
        <Text style={styles.dateRange}>
          Available from:{' '}
          {new Date(item.start_date).toLocaleDateString('en-CA')} to{' '}
          {new Date(item.end_date).toLocaleDateString('en-CA')}{' '}
          {/* Display the date range */}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => toggleFavourite(item.id)}>
        <Image
          source={getHeartIcon(user.id, item.id)}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <View style={mainStyle.container}>
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Search Screen');
        }}>
        <Text>
          {location === 'Anywhere' &&
          guests === 'Add guests' &&
          when === 'Anytime'
            ? '🔍 Where do you want to stay?'
            : valueChoiceText()}
        </Text>

        {/* Thay nút x bằng nút filter khi có criteria */}
        {location !== 'Anywhere' ||
        guests !== 'Add guests' ||
        when !== 'Anytime' ? (
          <TouchableOpacity
            onPress={openModal}
            style={[
              styles.icon,
              {
                borderWidth: 1,
                borderRadius: 90,
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Image
              source={require('../assets/images/icons/filter.png')} // Thay thế hình ảnh nút filter
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      <FilterModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onApplyFilters={applyFilters} // Pass the applyFilters function to the modal
      />

      {/* Ẩn các nút location type nếu có criteria */}
      {location === 'Anywhere' &&
      guests === 'Add guests' &&
      when === 'Anytime' ? (
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
      ) : (
        <View style={styles.checkboxContainer}>
          <View style={mainStyle.col_flex}>
            <Text style={styles.checkboxLabel}>Present total price</Text>
            <Text style={styles.checkboxDescription}>
              All-inclusive, pre-tax
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setFilterByTaxInclusive(!filterByTaxInclusive)}>
            <Image
              source={
                filterByTaxInclusive
                  ? require('../assets/images/icons/checked.png') // Hiển thị hình ảnh checked khi được chọn
                  : require('../assets/images/icons/unchecked.png') // Hiển thị hình ảnh unchecked khi không được chọn
              }
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* List of Apartments */}
      <FlatList
        data={filteredDataWithFilter}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 25,
    margin: 15,
    flexDirection: 'row', // Thêm để các phần tử nằm ngang
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'space-between', // Chia khoảng cách giữa các phần tử
  },
  icon: {
    width: 20, // Chiều rộng 20
    height: 20, // Chiều cao 20
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff', // Màu nền trắng
    borderRadius: 10,
    borderColor: '#ddd', // Màu viền nhẹ
    borderWidth: 1,
    marginVertical: 10, // Khoảng cách dọc giữa các checkbox
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '600', // Tạo độ đậm cho chữ
    color: '#333', // Màu chữ
  },
  checkboxDescription: {
    fontSize: 14,
    color: '#777', // Màu chữ nhẹ hơn cho phần mô tả
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4, // Tạo góc bo tròn nhẹ
    borderColor: '#ddd', // Viền xung quanh ô checkbox
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHovered: {
    borderColor: '#00AEEF', // Viền đèn LED khi hover
    shadowColor: '#00AEEF',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
});
