import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import CheckBox from 'react-native-btr';

export const Setting = ({navigation, route}) => {

    const [sPriceValue, setSPriceValue] = useState('');
    const [cPriceValue, setCPriceValue] = useState('');
    const [wPriceValue, setWPriceValue] = useState('');
    const [lPriceValue, setLPriceValue] = useState('');

    try{
    AsyncStorage.getItem('setPrice').then ((sPrice)=> setSPriceValue(sPrice))
    AsyncStorage.getItem('colPrice').then ((cPrice)=> setCPriceValue(cPrice));
    AsyncStorage.getItem('whiPrice').then ((wPrice)=> setWPriceValue(wPrice));
    AsyncStorage.getItem('laPrice').then ((lPrice)=> setLPriceValue(lPrice));
    //alert(cPriceValue);
  } catch {
    alert('error');
  }
    const [sPrice, setSPrice] = useState(sPriceValue);
    const [cPrice, setCPrice] = useState(cPriceValue);
    const [wPrice, setWPrice] = useState(wPriceValue);
    const [lPrice, setLPrice] = useState(lPriceValue);

    const save= ()=>{
      if (cPrice && wPrice && lPrice && sPrice){  
      navigation.navigate("Home", {
        setPrice: sPrice,
        colPrice: cPrice, 
        whiPrice: wPrice,
        laPrice: lPrice,     
      });  
      AsyncStorage.setItem('setPrice', sPrice); 
      AsyncStorage.setItem('colPrice', cPrice); 
      AsyncStorage.setItem('whiPrice', wPrice); 
      AsyncStorage.setItem('laPrice', lPrice); 
      alert('Adatok elmentve'); 
      }else{
      alert('Töltsd ki mindegyik mezőt!')  
      }  
    };

    return ( 
        <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.boldText}>Beállítások</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text1}>Színes egységár {cPriceValue} Ft</Text>
        <TextInput style={styles.inputArea}
        value = {cPrice}
        onChangeText={setCPrice}
        keyboardType='numeric'
        onPressIn={()=> setCPrice('')}
        />
        <Text style={styles.text1}>Fehér egységár {wPriceValue} Ft</Text>
        <TextInput style={styles.inputArea}
        value={wPrice}
        onChangeText={setWPrice}
        keyboardType='numeric'
        onPressIn={()=> setWPrice('')}
        />
        <Text style={styles.text1}>Lakk egységár {lPriceValue} Ft</Text>
        <TextInput style={styles.inputArea}
        value={lPrice}
        onChangeText={setLPrice}
        keyboardType='numeric'
        onPressIn={()=> setLPrice('')}
        />
        <Text style={styles.text1}>Beállítási költség: {sPriceValue} Ft</Text>
        <TextInput style={styles.inputArea}
        value={sPrice}
        onChangeText={setSPrice}
        keyboardType='numeric'
        onPressIn={()=> setSPrice('')}
        />
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.settingbutton} onPress={save}>
        <Text style={styles.text6}>Mentés</Text>
      </TouchableOpacity>
      </View> 
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.popToTop()}>
        <Text style={styles.text6}>Kezdőlap</Text>
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView> 
      </View>
    );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ade7ff',
    },
    header:{
      backgroundColor: '#0455a5',
      padding: 20,
      alignItems:'center',
    },
    boldText:{
      fontWeight: 'bold',
      fontSize: 24,
      color: 'white',
    },
    body:{
      padding: 5,
      backgroundColor: '#ade7ff',
    },
    buttoncontainer:{
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'center',
    },
    checkBox:{
      marginRight: 5,
    },
    text1:{
      fontWeight: 'bold',
      padding: 5,
      color: 'black',
    },
    inputArea:{
      marginLeft: 100,
      marginRight: 100,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'black',
      backgroundColor: 'white',
      color: 'black'
    },
    text2:{
      textAlign: 'center',
      fontWeight: 'bold',
      padding: 40,
      fontSize: 24,
      color: '#248918',
    },
    text3:{
      textAlign: 'center',
      fontWeight: 'bold',
      paddingLeft: 5,
      color: 'red',
    },
    text6:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,  
    },
    buttons:{
        marginHorizontal: '20%',
        paddingTop: 30,
    },
    settingbutton:{
      height: 50,
      backgroundColor: '#0455a5',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 15,
    }
  });

export default Setting;
