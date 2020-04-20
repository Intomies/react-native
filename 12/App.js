import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Text, 
         View,
         FlatList, 
         TextInput, 
         KeyboardAvoidingView, 
         TouchableOpacity,
        } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [listData, setListData] = useState([]);
  const db = SQLite.openDatabase('shoplist.db');

  useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists shoplist (id integer primary key not null, product text, amount text);');
  }, null, updateList);
  }, []);

  const saveItem = () => {
      db.transaction(tx => {
        tx.executeSql('insert into shoplist (product, amount) values (?, ?);',
        [product, amount]);
      }, null, updateList
    );
    setProduct('');
    setAmount('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoplist;', [], (_, { rows }) => 
      setListData(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => { 
      tx.executeSql('delete from shoplist where id = ?;', [id]);
      }, null, updateList
    );
  }

  const deleteAllItems = () => {
    db.transaction(tx => { 
      tx.executeSql('delete from shoplist;');
      }, null, updateList
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.headline}>Shopping List</Text>
        <View style={styles.text}>
            <TextInput
            autoFocus
            style={styles.textIn}
            onChangeText={(product) => setProduct(product)}
            value={product}
            placeholder='Product'
            />
            <TextInput
            style={styles.textIn}
            onChangeText={(amount) => setAmount(amount)}
            value={amount}
            placeholder='Amount'
            />
        </View>    
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.bubble, styles.button]} onPress={saveItem}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.button]} onPress={deleteAllItems}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.history}>
            <FlatList style={{marginTop: 20}}
            keyExtractor={item => item.id.toString()}
            data={listData}
            renderItem={({item}) =>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text style={{marginBottom: 2, fontSize: 16, color: '#edede8', opacity: 0.8}}>{item.product}, {item.amount}</Text>
              <Text style={{color:'rgba(33, 184, 174 ,0.7)', marginLeft: 30, fontSize: 16}} onPress={() => deleteItem(item.id)}>Bought</Text>
            </View>
            }/>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
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
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'rgba(33, 184, 174 , 0.8)',
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