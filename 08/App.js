import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, Keyboard, Picker, ImageBackground } from 'react-native';

export default function App() {

  const [currentRates, setCurrentRates] = useState([]);
  const [rate, setRate] = useState(0);
  const [index, setIndex] = useState(0);
  const [sum, setSum] = useState(0.00);
  const [conv, setConv] = useState(0);

  useEffect(() => {
    fetchData();
    } ,[]
  )

  const conversion = () => {
    setConv((parseInt(sum) / rate).toFixed(2));
  }

  const fetchData = async () => {
    try {
    const apiKey = ''; // Your API-key goes here
    const apiUrl = 'http://data.fixer.io/api/latest?access_key=' + apiKey + '&format=1';
    const response = await fetch(apiUrl);
    const data = await response.json();
    setCurrentRates(data.rates);
    Keyboard.dismiss();
    } 
    catch (error) {
    Alert.alert('Error' , error);
  }
}
  
  
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.dispImage} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeTprdiGG3fVxJx_B1NUukxFkm99jVvkZtVztZv-jNq3nSFivK"}} />
      <Text style={styles.dispText}>{conv}</Text>
      <View style={{flexDirection: "row"}}>
        <TextInput
        style={styles.textIn}
        keyboardType="numeric"
        onChangeText={(sum) => setSum(sum)}
        />
        <Picker
        style={styles.picker}
        selectedValue={rate}
        onValueChange={
          (itemValue, itemIndex) => {
            setRate(itemValue);
            setIndex(itemIndex);
          }
        }
        >
        {Object.keys(currentRates).map((k) => {
          return <Picker.Item label={k} value={currentRates[k]} key={index} />
        })}
        </Picker>
      </View>
        <Button style={styles.buttons} title="Convert" onPress={conversion} />
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  textIn: {
    fontSize: 18,
    width: 100,
    height: 40, 
    borderWidth: 1,
    fontSize: 30,
    borderRadius: 5,
    paddingLeft: 4,
  },
  buttons: {
    padding: 15,
    overlayColor: 'black'
  },
  dispText: {
    padding: 25,
    fontSize: 30,
  },
  picker: {
    width: 100,
    height: 50,
  },
  dispImage: {
    width: 100, 
    height: 120
  }
  });