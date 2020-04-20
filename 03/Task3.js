import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [res, setRes] = useState(0);
  const [data, setData] = useState([]);

  const calcSum = () => {
    const sum = parseInt(first) + parseInt(second);
    const item = first + ' + ' + second + ' = ' + sum;
    setRes(sum);
    setData([...data, {key: item}]);
  }
  const calcSub = () => {
    const sum = parseInt(first) - parseInt(second);
    const item = first + ' - ' + second + ' = ' + sum;
    setRes(sum);
    setData([...data, {key: item}]);
  }

  return (
    <View style={styles.container}>
        <View style={styles.text}>
            <Text>Result: {res}</Text>
            <TextInput
            keyboardType="numeric"
            style={styles.textIn}
            onChangeText={(numberOne) => setFirst(numberOne)}
            />
            <TextInput
            keyboardType="numeric"
            style={styles.textIn}
            onChangeText={(numberTwo) => setSecond(numberTwo)}
            />
        </View>    
        <View style={styles.buttons}>
            <Button onPress={calcSum} title="+" />
            <Button onPress={calcSub} title="-" />
        </View>
        <View style={styles.history}>
            <Text>History:</Text>
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
    width: 75,
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