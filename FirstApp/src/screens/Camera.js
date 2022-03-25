import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';

import CustomButton from '../utils/CustomButton';

function Camera({navigation, route}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const captureHandler = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      updateTask(route.params.id, filePath);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = (id, path) => {
    const index = tasks.findIndex(t => t.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Image = path;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Photo added successfully');
          navigation.goBack();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.preview}>
        <CustomButton
          title="Capture"
          color="#1eb900"
          pressHandler={() => {
            captureHandler();
          }}
        />
      </RNCamera>
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
    textAlign: 'center',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Camera;
