import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import mainStyle from "../assets/stylesheet/StyleSheet.js";

export default function BeginScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // After 1 second, navigate to the next screen
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading
      navigation.navigate("Create An Account Screen");
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [navigation]);

  return (
    <View style={[mainStyle.container, mainStyle.column_center_flex]}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Image source={require('../assets/images/logos/app-logo.png')} style={styles.logo} />
        </View>
      ) : (
        <Image source={require('../assets/images/logos/app-logo.png')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
  },
});
