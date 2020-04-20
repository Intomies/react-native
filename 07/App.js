import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Keyboard, Image } from 'react-native';

export default function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState('');

  const fetchData = async () => {
    try {
    const apiUrl = 'http://www.recipepuppy.com/api/?i=' + ingredient;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setRecipes(data.results)
    Keyboard.dismiss();
    } 
    catch (error) {
    Alert.alert('Error' , error);
  }
}
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textIn}>
        <TextInput 
          value={ingredient} 
          placeholder="Ingredient"
          onChangeText={(ingredient) => setIngredient(ingredient)} 
        />
      </View>
      <View style={styles.buttons}>
        <Button title="Find" onPress={fetchData} />
      </View>
      <View style={styles.list}>
        <FlatList
          data={recipes} 
          renderItem={({item}) => 
          <View>
            <Image style={{width:50, height:50}} source={{uri: item.thumbnail}} />
            <Text>{item.title}</Text>
          </View>} 
          ItemSeparatorComponent={listSeparator}
        />
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  list: {
    flex: 10,
    marginLeft : "5%"
  },
  textIn: {
    flex: 0.5,
    justifyContent: 'flex-start',
    fontSize: 18,
    width: 200,
    borderWidth: 1,
  },
  buttons: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 5,
  },
  });