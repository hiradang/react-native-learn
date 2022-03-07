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
  Modal,
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
  const [showWarning, setShowWarning] = useState(false);

  const onSubmit = () => {
    if (name.length > 3) {
      setSubmit(!submit);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.body}>
        <Modal
          visible={showWarning}
          onRequestClose={() => setShowWarning(false)}
          transparent={true}>
          <View style={styles.warningContainer}>
            <View style={styles.warningModal}>
              <View style={styles.warningHeader}>
                <Text>WARNING!</Text>
              </View>

              <View style={styles.warningBody}>
                <Text>Your name must be at least 3 characters long.</Text>
              </View>

              <Pressable
                onPress={() => setShowWarning(false)}
                style={styles.warningButton}
                android_ripple={{color: '#fff'}}>
                <Text style={styles.text}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  warningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warningModal: {
    backgroundColor: '#fff',
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  warningHeader: {
    height: 50,
    backgroundColor: '#fa4866',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warningBody: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningButton: {
    backgroundColor: '#42f566',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 50,
  },
});

export default App;
