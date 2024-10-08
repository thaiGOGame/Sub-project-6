import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    gap: 10,
    height: '100vh',
    alignItems: 'left',
    padding: '2vh',
  },
  row_center_flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_left_flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row_right_flex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  row_space_between_flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row_space_around_flex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  column_center_flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column_left_flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  space_between_flex: {
    justifyContent: 'space-between',
  },
  bold_text:{
    fontWeight: "bold",
    fontSize: 20,
  }
});

export default styles;