import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Done() {
  return (
    <View style={styles.body}>
      <Text>Done</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
  },
});
