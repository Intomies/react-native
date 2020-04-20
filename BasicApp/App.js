import React, { useState } from 'react';
import { 
        StyleSheet, 
        View, 
        Text, 
      } from 'react-native';

export default function App() {

  const foo  = 'Hello World!'

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{foo}</Text>
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
});