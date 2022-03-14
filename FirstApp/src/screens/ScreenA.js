import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';

function ScreenA({navigation, route}) {
  const onPressHandler = () => {
    // Move to screen B by using the navigate funtion
    navigation.navigate('Screen_B', {
      ItemName: 'Item from Screen A',
      ItemId: 12,
    });
    // navigation.openDrawer();
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Screen A </Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={GlobalStyle.ButtonStyle}>Go to Screen B</Text>
      </Pressable>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>
        {route.params?.Message}
      </Text>
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
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ScreenA;
