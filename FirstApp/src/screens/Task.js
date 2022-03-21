import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../utils/CustomButton';
import {setTask} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks, setTaskID} from '../redux/actions';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
    }
  };

  const setTask = () => {
    if (title.length != 0) {
      if (desc.length != 0) {
        try {
          var Task = {
            ID: taskID,
            Title: title,
            Desc: desc,
          };
          const index = tasks.findIndex(task => task.ID === taskID);
          let newTasks = [];

          if (index > -1) {
            newTasks = [...tasks];
            newTasks[index] = Task;
          } else {
            newTasks = [...tasks, Task];
          }

          AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
            .then(() => {
              dispatch(setTasks(newTasks));
              Alert.alert('Success!', 'Task saved successfully!');
              navigation.goBack();
            })
            .catch(err => console.error(err));
        } catch (err) {
          console.error(err);
        }
      } else {
        Alert.alert('Warning', 'Please write task description');
      }
    } else {
      Alert.alert('Warning', 'Please write task name');
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Add a new task</Text>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Description"
        multiline
        onChangeText={value => setDesc(value)}
      />

      <CustomButton
        title="Save"
        color="#1eb900"
        pressHandler={setTask}
        style={{width: '100%'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#555',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#fff',
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 12,
    marginTop: 10,
  },
});
