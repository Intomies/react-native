import React, 
        { useState, 
          useEffect,
        } 
        from 'react';

import { StyleSheet, 
         View,
         FlatList, 
         KeyboardAvoidingView, 
         TouchableOpacity,
         Keyboard,
        } 
        from 'react-native';

import { Input,  
         ListItem,
         Icon,  
        } 
        from 'react-native-elements';

import * as SQLite from 'expo-sqlite';

export default function Saved(props) {

  const [listData, setListData] = useState([]);
  const [address, setAddress] = useState('');
  const db = SQLite.openDatabase('addresslist.db');

  useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exist addresslist (id integer primary key not null, address text);');
  }, null, updateList);
  }, []);

  const saveItem = () => {
      db.transaction(tx => {
        tx.executeSql('insert into addresslist (address) values (?);',
        [address]);
      }, null, updateList
    );
    setAddress('')
    Keyboard.dismiss();
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresslist;', [], (_, { rows }) => 
      setListData(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => { 
      tx.executeSql('delete from addresslist where id = ?;', [id]);
      }, null, updateList
    );
  }

  const {navigate} = props.navigation;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.text}>
            <Input
            autoFocus
            style={styles.textIn}
            onChangeText={(address) => setAddress(address)}
            value={address}
            placeholder='Type address here..'
            placeholderTextColor='rgba(33,33,33,0.7)'
            />
        </View>    
        <View style={styles.buttons}>
          <TouchableOpacity icon={{name:'save'}} style={[styles.bubble, styles.button]} onPress={saveItem}>
          <Icon 
            name='save'
            size={30}
            color='rgba(33, 120, 200 ,1)'
            />
          </TouchableOpacity>
        </View>
        <View>
            <FlatList style={{marginTop: 20}}
            keyExtractor={item => item.id.toString()}
            data={listData}
            renderItem={({item}) => (
            <ListItem
                  title={item.address}
                  bottomDivider
                  onPress={() => navigate('Map', {location: item.address})}
                  chevron={{color: 'rgb(33,33,33)'}}
                  onLongPress={() => deleteItem(item.id)}
                />
            )}/>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 100,
    justifyContent: 'flex-start',
    padding: 40,
  },
  text: {
    alignItems: 'center'
  },
  textIn: {
    borderWidth: 1,
    borderColor: 'rgba(33, 184, 174 ,0.7)',
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    justifyContent: 'space-around',
    fontSize: 16,
    color: '#edede8',
    opacity: 0.8,
    paddingLeft: 4,
    marginVertical: 5,
    borderRadius: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  history: {
      alignItems: 'center'
  },
  headline: {
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(33, 184, 174 , 1)',
    borderBottomWidth: 1,
    borderColor: 'rgba(33, 184, 174 , 0.8)'
  },
  bubble: {
    backgroundColor: 'rgba(33, 184, 174 , 0)',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    borderColor: 'rgba(33, 120, 200 ,1)',
    textDecorationColor: '#edede8', 
    textDecorationStyle: 'solid',
    opacity: 0.8,
  },
  button: {
    height: 45,
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign:'center',
    color: '#edede8', 
    opacity: 0.8,
    fontSize: 15
  }
});