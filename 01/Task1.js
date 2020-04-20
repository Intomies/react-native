import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [res, setRes] = useState(0);


  const calcSum = () => {
    const sum = parseFloat(first) + parseFloat(+second);
    setRes(sum);
    setFirst(0);
    setSecond(0);
  }

  const calcSub = () => {
    const sub = parseFloat(+first) - parseFloat(+second);
    setRes(sub);
    setFirst(0);
    setSecond(0);
  }

  return (
    <View style={styles.container}>
      <Text>Result: {res}</Text>
      <View style={styles.textIn}>
      <TextInput keyboardType='numeric' style={{width: 50, height: 25, borderWidth: 1}} onChangeText={first => setFirst(first)} value={first}></TextInput>
      <TextInput keyboardType='numeric' style={{width: 50, height: 25, borderWidth: 1}} onChangeText={(second) => setSecond(second)} value={second}></TextInput>
      </View>
      <View style={styles.buttons}>
        <Button title="+" onPress={calcSum}/>
        <Button title="-" onPress={calcSub}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    padding: 40,
  },
  textIn: {
    flexDirection: 'row',
    width:150,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    width:80,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
});
