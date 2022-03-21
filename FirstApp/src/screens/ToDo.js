import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks, setTaskID} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground} from 'react-native';

export default function ToDo({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(res => {
        const data = JSON.parse(res);
        if (data && typeof data === 'object') {
          dispatch(setTasks(data));
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <ImageBackground
      style={styles.body}
      source={require('../../assets/background.jpg')}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}>
            <Text style={styles.title} numberOfLines={1}>
              {item.Title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.Desc}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#00ff00',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0080ff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
});
