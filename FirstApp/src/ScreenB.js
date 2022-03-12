import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

function ScreenB({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Screen_A');

    // Do it another way
    // navigation.goBack();
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen B </Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Go to Screen A</Text>
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

export default ScreenB;