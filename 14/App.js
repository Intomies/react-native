import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MapScreen from './Components/MapScreen.js';
import Saved from './Components/Saved.js';

const AppNavigator = createStackNavigator(
{
  AddressList: {screen: Saved},
  Map: {screen: MapScreen}
}
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}