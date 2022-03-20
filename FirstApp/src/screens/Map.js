import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import MapView from 'react-native-maps';

function Map({route}) {
  const {city, lat, lng} = route.params;

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.GlobalStyle, styles.text]}>Map of {city}!</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
  },
  map: {
    width: '100%',
    height: '90%',
  },
});

export default Map;
