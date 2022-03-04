/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';

const App = () => {
  // list of items
  const [items, setItems] = useState([
    {key: 1, value: 'Item 1'},
    {key: 2, value: 'Item 2'},
    {key: 3, value: 'Item 3'},
    {key: 4, value: 'Item 4'},
    {key: 5, value: 'Item 5'},
    {key: 6, value: 'Item 6'},
    {key: 7, value: 'Item 7'},
    {key: 8, value: 'Item 8'},
    {key: 9, value: 'Item 9'},
    {key: 10, value: 'Item 10'},
  ]);
  const [isRefreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    // do something when refresh here
    //

    // Turn off the spinning arrow
    setRefreshing(false);
  };

  return (
    <ScrollView
      horizontal={false}
      style={styles.body}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={['#00ff00']}
        />
      }>
      {items.map((item, key) => {
        return (
          <View style={styles.item} key={key}>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: '100%',
  },
  item: {
    backgroundColor: '#4ae1fa',
    textAlign: 'center',
    margin: 10,
  },
  text: {
    color: '#999',
    fontSize: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default App;
