import React, {useState, useEffect} from 'react';
import { StyleSheet, 
        Dimensions, 
        Alert, 
        Keyboard, 
        KeyboardAvoidingView 
      } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen(props) {

  const {params} = props.navigation.state;
  const [lon, setLon] = useState(24.933845);
  const [lat, setLat] = useState(60.201615);
  const [latDelta, setLatDelta] = useState(0.0322)
  const [lonDelta, setLonDelta] = useState(0)
  const [asRatio, setAsRatio] = useState(0)
  
  useEffect(() => {
    const {width, height} = Dimensions.get('window');
    setAsRatio(width/height)
    setLonDelta(latDelta * asRatio)
    fetchData();
    } ,[]
  )
  
  const fetchData = async () => {
    try {
    const apiKey = ''; // Your API-key goes here
    const apiUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + apiKey + '&location=' + params.location.replace(' ', '+')
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
  