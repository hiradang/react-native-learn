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
  Image,
  ImageBackground,
} from 'react-native';

import CustomButton from './CustomButton';
import Header from './Header';

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
      <ImageBackground
        style={styles.body}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2019/08/14/20/54/mobile-video-game-vector-background-4406706_1280.png',
        }}>
        <Header />
        <Modal
          visible={showWarning}
          onRequestClose={() => setShowWarning(false)}
          transparent={true}
          animationType="fade"
          hardwareAccelerated>
          <View style={styles.warningContainer}>
            <View style={styles.warningModal}>
              <View style={styles.warningHeader}>
                <Text>WARNING!</Text>
              </View>

              <View style={styles.warningBody}>
                <Text>Your name must be at least 4 characters long.</Text>
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
        <CustomButton
          title={submit ? 'Clear' : 'Submit'}
          pressHandler={onSubmit}
        />
        {submit ? (
          <View style={styles.body}>
            <Text style={styles.text}>Your name is: {name}</Text>
            <Image
              source={require('../assets/done.png')}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
        ) : (
          <Image
            source={require('../assets/error.png')}
            style={styles.image}
            resizeMode="stretch"
          />
        )}
      </ImageBackground>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  body: {
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
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default App;
