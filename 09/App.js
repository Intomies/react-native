import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, View, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

const [userInput, setUserInput] = useState('');
const [lon, setLon] = useState(0);
const [lat, setLat] = useState(0);
const [latDelta, setLatDelta] = useState(0)
const [lonDelta, setLonDelta] = useState(0)
const [asRatio, setAsRatio] = useState(0)

useEffect(() => {
  const {width, height} = Dimensions.get('window');
  setAsRatio(width/height)
  setLatDelta(0.0322)
  setLon(24.933845);
  setLat(60.201615);
  setLonDelta(latDelta * asRatio)
  } ,[]
)

const createAddress = () => {
  return userInput.replace(' ', '+')
}

const fetchData = async () => {
  try {
  const apiKey = ''; // Your API-key goes here
  const apiUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + apiKey + '&location=' + createAddress()
  const response = await fetch(apiUrl);
  const data = await response.json();
  setLon(data.results[0].locations[0].latLng.lng)
  setLat(data.results[0].locations[0].latLng.lat)
  Keyboard.dismiss();
  } 
  catch (error) {
  Alert.alert('Error: ' + error);
  } 
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lon,
          latitudeDelta:lonDelta,
          longitudeDelta:latDelta,
        }}
        > 
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon
          }} />
        </MapView>
        <View  style={{flex: 2/10, justifyContent: 'space-around', alignItems: 'center',}}>
          <View style={{flex: 1/2}}>
            <TextInput
              placeholder="Address"
              style={styles.textIn}
              onChangeText={(userInput) => setUserInput(userInput)}
              />
          </View>
          <View style={{flex: 1/2}}>
            <TouchableOpacity style={[styles.bubble, styles.button]} title="show" onPress={fetchData}>
              <Text styles={{textAlign:'center', }}>SHOW</Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
       
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textIn: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    padding: 10,
    borderRadius: 10,
    textAlign:'center',
  },
  bubble: {
    backgroundColor: 'rgba(0, 51, 204,0.8)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
