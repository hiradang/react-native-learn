import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../utils/CustomButton';

function Home({navigation, route}) {
  const [name, setName] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserName').then(value => {
        if (value !== null) {
          setName(value);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning!', 'Please input your name!');
    } else {
      try {
        await AsyncStorage.setItem('UserName', name);
        Alert.alert('Success!', 'Your data has been updated!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('UserName');
      navigator.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Home </Text>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Welcome {name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name!"
        value={name}
        onChangeText={value => setName(value)}></TextInput>

      <CustomButton title="Update" color="#32a852" pressHandler={updateData} />
      <CustomButton title="Remove" color="#f55" pressHandler={removeData} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
});

export default Home;
