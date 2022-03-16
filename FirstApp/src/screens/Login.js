import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value !== null) {
          navigation.navigate('Home');
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const setData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning!', 'Please input your name!');
    } else {
      try {
        let user = {
          Name: name,
          Age: age,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/asyncstorage.png')}
      />
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Async Storage</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name!"
        onChangeText={value => setName(value)}></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Enter your age!"
        onChangeText={value => setAge(value)}></TextInput>
      <CustomButton title="Login" color="#1eb900" pressHandler={setData} />
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 130,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 20,

    marginBottom: 10,
  },
});

export default Login;
