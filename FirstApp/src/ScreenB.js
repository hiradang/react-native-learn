import {NavigationHelpersContext} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

function ScreenB({navigation, route}) {
  const {ItemName, ItemId} = route.params;

  const onPressHandler = () => {
    // navigation.goBack();
    // navigation.setParams({ItemId: 14});
    navigation.navigate('Screen_A', {Message: 'Message from Screen B'});
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B </Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Back to screen A</Text>
      </Pressable>
      <Text style={styles.text}>{ItemName}</Text>
      <Text style={styles.text}>ID: {ItemId} </Text>
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ScreenB;
