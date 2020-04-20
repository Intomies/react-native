import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [ans, setAns] = useState(0);
  const [guess, setGuess] = useState('');
  const [count, setCount] = useState(0)
  const [hint, setHint] = useState('')

  useEffect(() => {
    setupGame();
    } ,[]
  )

  const setupGame = () => {
    setAns(Math.floor(Math.random() * 100 + 1));
    setHint('Guess a number between 1-100');
    setCount(0);
    setGuess(0);
  }

  const checkGuess = () => {
    setCount(count +1);

    if(guess == ans) {
      alert('You guessed the right number in ' + count + ' guesses!');
      setupGame();
    }
    else if(guess < ans) {
      setHint('Your guess ' + guess + ' is too low!');
      setGuess(0);
    }
    else if(guess > ans) {
      setHint('Your guess ' + guess + ' is too high!');
      setGuess(0);
    }
  }


  return (
    <View style={styles.container}>
      <Text>{hint}</Text>
      <View style={styles.textIn}>
        <TextInput keyboardType='numeric' style={{width: 50, borderWidth: 1,}} onChangeText={(guess) => setGuess(guess)} value={guess}></TextInput>
      </View>
      <View style={styles.buttons}>
        <Button title="MAKE GUESS" onPress={checkGuess}/>
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
    width:80,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    width:200,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
});
