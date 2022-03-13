import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ScreenA from './ScreenA';
import ScreenB from './ScreenB';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Screen_B"
        drawerPosition="right"
        drawerType="slide"
        edgeWidth={100}
        hideStatusBar={true}
        overlayColor="#00000090"
        drawerStyle={{
          backgroundColor: '#e6e6e6',
          width: 250,
        }}
        screenOptions={{
          headerShow: true,
          swipeEnabled: true,
          gestureEnabled: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTitleColor: '#fff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <Drawer.Screen
          name="Screen_A"
          component={ScreenA}
          options={{
            title: 'Screen A Title',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name="adn"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Screen_B"
          component={ScreenB}
          options={{
            title: 'Screen B Title',
            drawerIcon: ({focused}) => (
              <FontAwesome5
                name="btc"
                size={focused ? 25 : 20}
                color={focused ? '#0080ff' : '#999'}
              />
            ),
          }}
          initialParams={{
            ItemName: 'Item from Drawer',
            ItemId: 12,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
