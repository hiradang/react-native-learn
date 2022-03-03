/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [name, setName] = useState('Style Test');

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{name}!</Text>

      <View style={styles.button}>
        <Button
          title="Change info"
          onPress={() => {
            setName('Style Test done!');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#403244',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 20,
    borderColor: '#324393',
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 40,
    fontStyle: 'italic',
    margin: 10,
    textTransform: 'uppercase',
  },
  button: {
    width: 250,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default App;
