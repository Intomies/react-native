import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {

  const [listItem, setListItem] = useState('');
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([...data, {key: listItem}]);
  }
  const clearList = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
        <View style={styles.text}>
            <TextInput
            style={styles.textIn}
            onChangeText={(newListItem) => setListItem(newListItem)}
            />
        </View>    
        <View style={styles.buttons}>
            <Button onPress={addItem} title="Add" />
            <Button onPress={clearList} title="Clear" />
        </View>
        <View style={styles.history}>
            <Text>Shopping List:</Text>
            <FlatList
            data={data}
            renderItem={({item}) =>
            <Text>{item.key}</Text>
            }/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
    padding: 40,
  },
  text: {
    alignItems: 'center'
  },
  textIn: {
    borderWidth: 1,
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  history: {
      alignItems: 'center'
  }
});