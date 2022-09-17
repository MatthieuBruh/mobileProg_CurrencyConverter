import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [choosenValue, setChoosenValue] = useState(2);
  const [choosenIndex, setChoosenIndex] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);
  
  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=GBP%2CJPY%2CCHF%2CUSD%2CAUD&base=EUR", {
      method: 'GET',
      redirect: 'follow',
      headers: new Headers({
        "apikey": "QOq745WIjhTnLVzDjknILq2GYuaWb3mY"
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.rates);
        setLoading(false);
      })
      .catch((error) => console.error(error))
  }, []);

  const calculate = () => {
    setResult(Math.round((value / data[choosenValue]) * 100) / 100)
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30}}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        
        <View style={styles.currencyResultContainer}>
          <Image
              style={styles.tinyLogo}
              source={{ uri: "https://img.favpng.com/2/16/6/euro-sign-money-currency-symbol-png-favpng-eBq4gG7uPEF6PS6gCzq7M3bgE.jpg", }}
            />
          <Text style={{ fontSize: 20}}>{result}€</Text>
        </View>

        <View style={styles.currencyInputContainer}>
          <View style={styles.userInputContainer}>
            <TextInput style={styles.userInputText}
              keyboardType='numeric'
              placeholder="Enter amount"
              value={value}
              onChangeText={text => setValue(text)}
            />
            <Picker style={styles.currencyPicker}
              selectedValue={choosenValue}
              onValueChange={(itemValue, itemIndex) => {
                setChoosenValue(itemValue);
                setChoosenIndex(itemIndex);
              }}>
              {
                Object.keys(data).map((key, index) => {
                  return (<Picker.Item label={key} value={key} key={index} />)
                })
              }
            </Picker>
          </View>

          <Button
            title='Convert'
            onPress={calculate}
          />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  currencyResultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  currencyInputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  userInputContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: "row",
    width: '75%',
  },
  userInputText: {
    height: 40,
    borderColor: 'blue',
    borderBottomWidth: 1,
    width: '50%'
  },
  currencyPicker: {
    width: '50%'
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});