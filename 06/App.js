import React, {useState, useEffect} from 'react';
import { StyleSheet,
         Text, View, KeyboardAvoidingView, TextInput, Button, Alert, AsyncStorage} from 'react-native';

export default function App() {

  const [ans, setAns] = useState(0);
  const [guess, setGuess] = useState(0);
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);
  const [hint, setHint] = useState('');
  const [high, setHigh] = useState(null);
  const [highscoreVisibility, setHighscoreVisibility] = useState('none');
  const defaultHighscore = 99999;

  useEffect(() => {
    setupGame();
    setHighscoreDefaultValue();
    } ,[]
  )
  
  const setupGame = () => {
    setAns(Math.floor(Math.random() * 100 + 1));
    setHint('Guess a number between 1-100');
    setCount(0);
    setGuess(0);
    isHighscoreVisible()
  }

  const setHighscoreDefaultValue = async () => {
    try {
      AsyncStorage.setItem('highscore', JSON.stringify(defaultHighscore))
    } catch (error) {
      Alert.alert("Couldn't set default highscore: " + error)
    }
  }
  
  const checkGuess = () => {
    setCount(count +1)
    
    if(guess == ans) {
      alert('You guessed the right number in ' + (count +1) + ' guesses!');
      gameOver()
    }
    if(guess < ans) {
      setHint('Your guess ' + guess + ' is too low!');
      setGuess(0);
    }
    if(guess > ans) {
      setHint('Your guess ' + guess + ' is too high!');
      setGuess(0);
    }
  }

  const gameOver = async () => {
    let check = await getHighscore()
    let currCount = count +1
    if (currCount < check) {
      setHigh(currCount)
      saveHighscore()
      setHighscoreVisibility('flex')
    }
    setupGame();
  }
  
  const isHighscoreVisible = () => {
    if (high == null) {
      setHighscoreVisibility('none')
      //setHighscoreVisibility('flex')
    }
    else {
      setHighscoreVisibility('flex')
    }
  }

  const saveHighscore = async () => {
    try {
      await AsyncStorage.setItem('highscore', JSON.stringify(count))
    } catch (error) {
      Alert.alert(error)
    }
  }

  const getHighscore = async () => {
    try {
      let score = await AsyncStorage.getItem('highscore')
      return JSON.parse(score)
    } catch (error) {
      Alert.alert(error)
    }
  }


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text>{hint} ({ans})</Text>
      <View style={styles.textIn}>
        <TextInput keyboardType='numeric' style={{width: 50, borderWidth: 1,}} onChangeText={(guess) => setGuess(guess)} value={guess}></TextInput>
      </View>
      <View style={styles.buttons}>
        <Button title="MAKE GUESS" onPress={checkGuess}/>
      </View>
      <Text>Guesses: {count}</Text>
      <Text style={{display:highscoreVisibility}}>Highscore: {high}</Text>
    </KeyboardAvoidingView>
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
