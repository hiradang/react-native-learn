import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  err => {
    console.log(err);
  },
);

function Login({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
      );
    });
  };

  const getData = () => {
    try {
      // check whether the user has logged in or not
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age from Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('Home');
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const setData = async () => {
    if (name.length === 0 || age.length === 0) {
      Alert.alert('Warning!', 'Please input your data!');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            // "INSERT INTO Users (Name, Age) VALUES ('" + name + "'," + age + ')',
            'INSERT INTO Users (Name, Age) VALUES (?,?)',
            [name, age],
          );
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../assets/SQLite.jpg')} />
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>
        SQLite Database
      </Text>

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
