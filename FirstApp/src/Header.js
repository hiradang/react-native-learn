import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Learn React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#555',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  view: {
    backgroundColor: '#0000ff',
    width: '100%',
    height: 50,
  },
});

export default Header;
