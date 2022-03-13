import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

function ScreenA({navigation}) {
  const onPressHandler = () => {
    // Move to screen B by using the navigate funtion
    // navigation.navigate('Screen_B');
    navigation.openDrawer();
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A </Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Toggle drawer</Text>
      </Pressable>
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

export default ScreenA;
