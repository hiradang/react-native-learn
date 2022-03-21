import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Todo from './screens/ToDo';
import Done from './screens/Done';
import Splash from './screens/Splash';
import Map from './screens/Map';
import Camera from './screens/Camera';
import Task from './screens/Task';

import {Provider} from 'react-redux';
// import {Store} from './redux/store';
import {Store} from './redux/store';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Todo') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Todo" component={Todo} />
      <Tab.Screen name="Done" component={Done} />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login">
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="My Tasks"
            component={HomeTabs}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Map"
            component={Map}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
