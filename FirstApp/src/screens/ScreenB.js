import {NavigationHelpersContext} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

function ScreenB({navigation, route}) {
  const {ItemName, ItemId} = route.params;

  const onPressHandler = () => {
    // navigation.goBack();
    // navigation.setParams({ItemId: 14});
    navigation.navigate('Screen_A', {Message: 'Message from Screen B'});
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Screen B </Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={GlobalStyle.ButtonStyle}>Back to screen A</Text>
      </Pressable>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>{ItemName}</Text>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>ID: {ItemId} </Text>
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
    // fontFamily: 'LeagueSpartan-Regular',
  },
});

export default ScreenB;
