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
    width: '100%',
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
  col_flex: {
    flexDirection: 'column',
  },
  space_between: {
    justifyContent: 'space-between',
  },
  column_left_flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  space_between_flex: {
    justifyContent: 'space-between',
  },
  space_around_flex: {
    justifyContent: 'space-around',
  },
  bold_text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  width_full: {
    width: '100%',
  },
  lightgray_background: {
    backgroundColor: 'lightgray',
  },
  aqua_button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#00BCD4',
    marginVertical: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  modal_button: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#d9534f', // Red for error
    borderRadius: 5,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },  back_button: { marginBottom: 10, padding: 10, alignItems: 'flex-start' },back_button_text: { fontSize: 16, color: 'blue' },

});

export default styles;
