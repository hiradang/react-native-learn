import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, increaseAge, getCities} from '../redux/actions';
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

function Home({navigation, route}) {
  const {name, age, cities} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    getData();
    dispatch(getCities());
  }, []);

  const handleNotification = (item, index) => {
    // 1.cancel all existing notification
    // PushNotification.cancelAllLocalNotifications();

    // 2. cancel a specific notification
    // PushNotification.cancelLocalNotification({
    //   id: 3,
    // });

    PushNotification.localNotification({
      channelId: 'test-channel',
      title: `You clicked on ${item.country}`,
      message: item.city,
      bigText: `${item.city} is one of the most biggest city in ${item.country}`,
      color: 'red',
      id: index,
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Alarm',
      message: 'You clicked on ' + item.country + ' 5 seconds ago',
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: true,
    });
  };

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            dispatch(setName(userName));
            dispatch(setAge(userAge));
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateData = async () => {
    if (name.length === 0 || age.length === 0) {
      Alert.alert('Warning!', 'Please input your name!');
    } else {
      try {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [name],
            () => {
              Alert.alert('Success!', 'Your data has been updated!');
            },
            err => {
              console.log(err);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Login');
          },
          err => {
            console.log(err);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Home </Text>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Welcome {name}</Text>

      <FlatList
        data={cities}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleNotification(item, index)}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.country}</Text>
              <Text style={styles.subtitle}>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
    fontSize: 20,
    margin: 10,
    color: '#999999',
  },
});

export default Home;
