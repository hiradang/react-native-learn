/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  SectionList,
} from 'react-native';

const App = () => {
  // list of items => data for FlatList
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

  // data for Sectionlist
  const [data, setData] = useState([
    {title: 'Title 1', data: ['Item 1-1', 'Item 1-2']},
  ]);

  const [isRefreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    // do something when refresh here
    let count = data.length + 1;
    setData([
      ...data,
      {
        title: `Title ${count}`,
        data: [`Item ${count}-1`, `Item ${count}-2`],
      },
    ]);

    // Turn off the spinning arrow
    setRefreshing(false);
  };

  return (
    <SectionList
      style={styles.body}
      keyExtractor={(item, index) => index.toString()}
      sections={data}
      renderItem={({item}) => (
        <View style={styles.subItem}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section}) => (
        <View style={styles.item}>
          <Text style={styles.text}>{section.title}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={['#00ff00']}
        />
      }
    />

    // FlatList
    // <FlatList
    //   horizontal={false}
    //   converted={false}
    //   keyExtractor={(item, index) => index.toString()}
    //   data={items}
    //   renderItem={({item}) => (
    //     <View style={styles.item}>
    //       <Text style={styles.text}>{item.value}</Text>
    //     </View>
    //   )}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={isRefreshing}
    //       onRefresh={onRefresh}
    //       colors={['#00ff00']}
    //     />
    //   }
    // />

    // 3. List
    // <ScrollView
    //   horizontal={false}
    //   style={styles.body}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={isRefreshing}
    //       onRefresh={onRefresh}
    //       colors={['#00ff00']}
    //     />
    //   }>
    //   {items.map((item, key) => {
    //     return (
    //       <View style={styles.item} key={key}>
    //         <Text style={styles.text}>{item.value}</Text>
    //       </View>
    //     );
    //   })}
    // </ScrollView>
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
    margin: 2,
    borderColor: '#000',
    borderWidth: 2,
  },
  subItem: {
    borderColor: '#770066',
    borderWidth: 2,
    margin: 8,
  },
  text: {
    color: '#555',
    fontSize: 40,
    textAlign: 'center',
  },
});

export default App;
