import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function History(props) {

  const {params} = props.navigation.state;

  return (
    <View style={styles.history}>
        <Text>History:</Text>
        <FlatList
        contentContainerStyle={styles.listItems}
        data={params.history}
        renderItem={({item}) =>
        <Text>{item.key}</Text>
        }/>
    </View>
  );
}

const styles = StyleSheet.create({
  history: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  listItems: {
      flex: 1,
      justifyContent: 'center'
  }

});