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
  TouchableOpacity,
  Button,
  Pressable,
} from 'react-native';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const App = () => {
  const [name, setName] = useState('');
  const [submit, setSubmit] = useState(false);

  const onSubmit = () => {
    setSubmit(!submit);
  };

  return (
    <DismissKeyboard>
      <View style={styles.body}>
        <Text style={styles.text}>Please tell me you name:</Text>
        <TextInput
          // allow to input in many lines
          // multiline
          style={styles.textInput}
          placeholder="eg: Binh Dang"
          onChangeText={value => setName(value)}
          // keyboardType="numbers-and-punctuation"
          editable={true}
          maxLength={20}
          // secureTextEntry
        />

        {/* <Button title={submit ? 'Clear' : 'Submit'} onPress={onSubmit}></Button> */}

        {/* <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          activeOpacity={0.7}>
          <Text>{submit ? 'Clear' : 'Submit'}</Text>
        </TouchableOpacity> */}

        <Pressable
          onPress={onSubmit}
          // increase the area where users can touch
          hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
          android_ripple={{color: '#00f'}}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#dddddd' : '#00ff00'},
            styles.button,
          ]}>
          <Text style={styles.text}>{submit ? 'Clear' : 'Submit'}</Text>
        </Pressable>

        {submit ? <Text style={styles.text}>Your name is: {name}</Text> : null}
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
  button: {
    backgroundColor: 'green',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default App;
