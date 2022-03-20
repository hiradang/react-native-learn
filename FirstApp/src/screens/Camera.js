import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';

import CustomButton from '../utils/CustomButton';

function Camera({route}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const captureHandler = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalCachesDirectoryPath + '/MyTest.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('Image Moved! ', filePath, ' -- to -- ', newFilePath);
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.error(err);
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
