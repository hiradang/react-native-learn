import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks, setTaskID} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageBackground} from 'react-native';

export default function Done({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const checkTask = (id, value) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = value;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Task state is changed!');
        })
        .catch(err => console.error(err));
    }
  };

  const deleteTask = id => {
    const filterTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filterTasks))
      .then(() => {
        dispatch(setTasks(filterTasks));
        Alert.alert('Success!', 'Task removed successfully!');
      })
      .catch(err => console.error(err));
  };

  return (
    <ImageBackground
      style={styles.body}
      source={require('../../assets/background.jpg')}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#fff',
                  },
                  styles.color,
                ]}></View>
              <CheckBox
                value={item.Done}
                onValueChange={value => {
                  checkTask(item.ID, value);
                }}
              />
              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.Title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.ID);
                }}>
                <FontAwesome5 name="trash" size={25} color="#ff3636" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#93e6ed',
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
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  color: {
    width: 20,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
