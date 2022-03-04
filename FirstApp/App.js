/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const App = () => {
  const [name, setName] = useState('');

  return (
    <DismissKeyboard>
      <View style={styles.body}>
        <Text style={styles.text}>Please tell me you name:</Text>
        <TextInput
          // allow to input in many lines
          // multiline
          style={styles.textInput}
          placeholder="Binh Dang"
          onChangeText={value => setName(value)}
          // keyboardType="numbers-and-punctuation"
          editable={true}
          maxLength={20}
          secureTextEntry
        />

        <Text style={styles.text}>Your name is: {name}, right?</Text>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#555',
    fontSize: 24,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    borderRadius: 5,
    fontSize: 20,
  },
});

export default App;
