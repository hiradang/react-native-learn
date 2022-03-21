import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.pressHandler}
      // increase the area where users can touch
      hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
      android_ripple={{color: 'red'}}
      style={({pressed}) => [
        {...props.style},
        {backgroundColor: pressed ? 'red' : props.color},
        styles.button,
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
  },
  button: {
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});

export default CustomButton;
