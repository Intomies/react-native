import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Calculator(props) {

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

  const {navigate} = props.navigation;

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
            <Button onPress={() => navigate('History', {history: data})} title="History" />
        </View>
        
    </View>
  );
}

Calculator.navigationOptions = ({navigate}) => ({title: 'Calculator'});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 100,
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
    justifyContent: 'center',
    padding: 10,
  },
});