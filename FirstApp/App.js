/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Button, Linking, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [name, setName] = useState('Binh Dang');
  const [info, setInfo] = useState({school: 'UET', year: 'third'});
  const [count, setCount] = useState(0);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{name}!</Text>
      <Text>
        I'm a {info.year} year student at {info.school}!
      </Text>

      <Button
        title="Change info"
        onPress={() => {
          setName('Hira Dang');
          setInfo({
            school: 'UET',
            year: 'fourth',
          });
        }}
      />

      <Text></Text>

      <Text>{count * 5}</Text>
      <Button
        title="Add"
        onPress={() => {
          setCount(count + 1);
        }}></Button>
      <Text>You clicked {count} times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#003344',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 10,
  },
});

export default App;
