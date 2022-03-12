import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ScreenA from './ScreenA';
import ScreenB from './ScreenB';

const BottomTab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            size = focused ? 30 : 20;
            color = focused ? '#f0f' : '#555';
            if (route.name === 'Screen_A') {
              iconName = 'autoprefixer';
            } else if (route.name === 'Screen_B') {
              iconName = 'btc';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
        })}>
        <BottomTab.Screen name="Screen_A" component={ScreenA} />
        <BottomTab.Screen name="Screen_B" component={ScreenB} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
