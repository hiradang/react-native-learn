import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PushNotification from 'react-native-push-notification';
import GlobalStyle from '../utils/GlobalStyle';

function Splash({navigation}) {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel',
    });
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/checklist.png')}
      />
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>To-do List</Text>
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
    fontSize: 40,
    textAlign: 'center',
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

export default Splash;
