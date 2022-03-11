import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScreenA = ({navigation}) => {
  const onPressHandler = () => {
    // Move to screen B by using the navigate funtion
    navigation.navigate('Screen_B');

    // Replace screen B over sreen A => Screen A is no longer in the stack
    // navigation.replace("Screen_B")
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Screen A </Text>

      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Go to Screen B</Text>
      </Pressable>
    </View>
  );
};

const ScreenB = ({navigation}) => {
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
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   header: () => null,
      // }}

      // Turn off header for every screen
      >
        <Stack.Screen
          name="Screen_A"
          component={ScreenA}
          options={{header: () => null}}
        />
        <Stack.Screen name="Screen_B" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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

export default App;
