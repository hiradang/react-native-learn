import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Alert} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../redux/actions';
import PushNotification from 'react-native-push-notification';

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
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    createTable();
    getData();
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

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
        dispatch(setName(name));
        dispatch(setAge(age));
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
      <Image style={styles.logo} source={require('../../assets/redux.png')} />
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Redux</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name!"
        onChangeText={value => dispatch(setName(value))}></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Enter your age!"
        onChangeText={value => dispatch(setAge(value))}></TextInput>
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
    width: 120,
    height: 110,
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
