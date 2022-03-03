/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.body}>
      <View style={styles.row}>
        <View style={styles.view1}>
          <Text style={styles.text}>1</Text>
        </View>

        <View style={styles.view2}>
          <Text style={styles.text}>2</Text>
        </View>

        <View style={styles.view3}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view4}>
          <Text style={styles.text}>4</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.view5}>
          <Text style={styles.text}>5</Text>
        </View>
      </View>

      <View style={styles.bigRow}>
        <View style={styles.view6}>
          <Text style={styles.text}>6</Text>
        </View>

        <View style={styles.view7}>
          <Text style={styles.text}>7</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bigRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    // Stretch to the full size of the parent
    // but we have to set the size of parent
    // which is in line 59
  },
  view1: {
    flex: 1,
    backgroundColor: '#000064',
  },
  view2: {
    flex: 2,
    backgroundColor: 'pink',
  },
  view3: {
    flex: 3,
    backgroundColor: 'yellow',
  },
  view4: {
    backgroundColor: 'red',
    flex: 1,
  },
  view5: {
    backgroundColor: 'green',
    flex: 1,
  },
  view6: {
    flex: 1,
    backgroundColor: 'white',
  },
  view7: {
    flex: 1,
    backgroundColor: 'blue',
  },
  text: {
    color: '#999',
    fontSize: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
