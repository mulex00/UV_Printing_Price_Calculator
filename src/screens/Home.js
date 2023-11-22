import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Linking, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setting from './Setting';

//import CheckBox from 'react-native-btr';
const Home = ({navigation}) => { 
  
  const route = useRoute();

  //Szinek arai:
  const [colorPrice, setColorPrice] = useState('0');
  const [whitePrice, setWhitePrice] = useState('0');
  const [lacPrice, setLacPrice] = useState('0');
  //Szinek checkbox statek
  const [colorPrint, setColorPrint] = useState(false);
  const [whitePrint, setWhitePrint] = useState(false);
  const [lacPrint, setLacPrint] = useState(false);
  //Sajat checkbox szinek
  const [colorCheckBoxColor, setColorCheckBoxColor] = useState('white');
  const [whiteCheckBoxColor, setWhiteCheckBoxColor] = useState('white');
  const [lacCheckBoxColor, setLacCheckBoxColor] = useState('white');

  const [setupPrice, setSetupPrice] = useState('0');
  const [widthPrice, setWidthPrice] = useState('0');
  const [heightPrice, setHeightPrice] = useState('0');
  const sizeOfPrint = widthPrice*heightPrice/100;
  const [quantityOfPrint, setQuantityOfPrint] = useState('0');

  let discount  = 1;
  let minSize = 50;
  let minQuantity = Math.round((minSize/sizeOfPrint));4

  let alert1 = '';
  let alert2 = ''; 
  let alert3 = '';

  let typeOfPrint = parseInt(colorPrice)+parseInt(whitePrice)+parseInt(lacPrice);
  let PriceWithoutDiscount = Math.round(parseInt(typeOfPrint)*parseInt(sizeOfPrint)*parseInt(quantityOfPrint)+parseInt(setupPrice)); 

//Kedvezmeny
if (quantityOfPrint<100){
  discount = 1;
}
if (quantityOfPrint>=100 && quantityOfPrint < 500){
  discount = 0.95;
  alert3 = '-5% kedvezmény! Eredeti ár: ' + PriceWithoutDiscount + ' Ft';
}
if (quantityOfPrint>=500 && quantityOfPrint < 1000){
  discount = 0.90;
  alert3 = '-10% kedvezmény! Eredeti ár: ' + PriceWithoutDiscount + ' Ft';
}
if (quantityOfPrint>=1000 && quantityOfPrint < 5000){
  discount = 0.85;
  alert3 = '-15% kedvezmény! Eredeti ár: ' + PriceWithoutDiscount + ' Ft';
}
if (quantityOfPrint>=5000){
  discount = 0.80;
  alert3 = '-20% kedvezmény! Eredeti ár: ' + PriceWithoutDiscount + ' Ft';
}

//Számolás 
let totalAmount = (parseInt(typeOfPrint)*parseInt(sizeOfPrint)*parseInt(quantityOfPrint)+parseInt(setupPrice))*discount;

//figyelmeztetések
if(!colorPrint && !whitePrint && !lacPrint){
  alert1 = 'Válaszd ki a minta típusát!';
  totalAmount = 0;
}

if(sizeOfPrint<minSize && quantityOfPrint<minQuantity){
alert2='50 cm2-nél kisebb minta esetén a minimum rendelés darabszáma ' + Math.round(minQuantity) + '!';
}

//adat mentés és betöltés
async function save(key, value){
  await AsyncStorage.setItem(key, value)
  console.log('adat mentve')
}

async function getColorPriceValueFor(key) {
  let result = await AsyncStorage.getItem(key);
  if (result) {
    setColorPrice(result);
    console.log('szines adat betoltve ' + result)    
  }else{
    console.log('Nem sikerult adatot betolteni')
      setColorPrice('20')
  }  
}

async function getWhitePriceValueFor(key) {
  let result = await AsyncStorage.getItem(key);
  if (result) {
    setWhitePrice(result);
    console.log('feher adat betoltve ' + result)    
  }else{
    console.log('Nem sikerult adatot betolteni')
      setWhitePrice('20')
  }  
}

async function getLacPriceValueFor(key) {
  let result = await AsyncStorage.getItem(key);
  if (result) {
    setLacPrice(result);
    console.log('lakk adat betoltve ' + result)    
  }else{
    console.log('Nem sikerult adatot betolteni')
      setLacPrice('20')
  }  
}

async function getSetupPriceValueFor(key) {
  let result = await AsyncStorage.getItem(key);
  if (result) {
    setSetupPrice(result);
    console.log('beallitasi koltseg betoltve ' + result)    
  }else{
    console.log('Nem sikerult adatot betolteni')
      setSetupPrice('5000')
  }  
}

//másik screenről kapott értékek léteznek-e?

if(route.params?.setPrice != undefined){
  save('setupPrice', route.params?.setPrice);
  getSetupPriceValueFor('setupPrice')
}

if(route.params?.setPrice === undefined){
  getSetupPriceValueFor('setupPrice')  
}
if(route.params?.colPrice != undefined){
  save('colorPrice', route.params?.colPrice);
}
if(route.params?.whiPrice != undefined){
  save('whitePrice', route.params?.whiPrice);
}
if(route.params?.laPrice != undefined){
  save('lacPrice', route.params?.laPrice);
}

    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.boldText}>UV nyomtatás kalkulátor</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text1}>Válaszd ki a minta típusát!     ({typeOfPrint} Ft/cm2)</Text>
        <Text style={styles.text3}>{alert1}</Text>
      <View style={styles.buttoncontainer}>
      <TouchableOpacity onPress={()=>{checkBoxColor()}}>
        <View style={[styles.touchopcolor, {backgroundColor:colorCheckBoxColor}]}>
        </View>
        <Text style={styles.text4}>Színes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{checkBoxWhite()}}>
      <View style={[styles.touchopwhite, {backgroundColor:whiteCheckBoxColor}]}>
      </View>
      <Text style={styles.text4}>Fehér</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{checkBoxLac()}}>
      <View style={[styles.touchoplac, {backgroundColor:lacCheckBoxColor}]}>
      </View>
      <Text style={styles.text4}>Lakk</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text5}>A beállítási / tálca költség: {setupPrice} Ft.</Text>
        <Text style={styles.text1}>Minta szélessége (mm):</Text>
        <TextInput style={styles.inputArea}
        value = {widthPrice}
        placeholder='Minta szélessége'
        onChangeText={(wPrice) => setWidthPrice(parseFloat(wPrice))}
        keyboardType='numeric'
        onPressIn={()=> setWidthPrice('')}
        />
        <Text style={styles.text1}>Minta magassága (mm):</Text>
        <TextInput style={styles.inputArea}
        value = {heightPrice}
        placeholder='Minta magassága'
        onChangeText={(hPrice) => setHeightPrice(parseFloat(hPrice))}
        keyboardType='numeric'
        onPressIn={()=> setHeightPrice('')}
        />
      <Text style={styles.text5}>A minta mérete: {sizeOfPrint} cm2.</Text>
      <Text style={styles.text3}>{alert2}</Text>
      <Text style={styles.text1}>Darabszám:</Text>
      <TextInput style={styles.inputArea}
        value = {quantityOfPrint}
        placeholder='Darabszám'
        onChangeText={(qPrint) => setQuantityOfPrint(parseInt(qPrint))}
        keyboardType='numeric'
        onPressIn={()=> setQuantityOfPrint('')}
        />
      </View>  
      <Text style={styles.text2}>A végösszeg: {Math.round(totalAmount)} Ft</Text>
      <Text style={styles.text8}>{alert3}</Text>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.settingbutton} onPress={()=>navigation.navigate("Setting")}>
        <Text style={styles.text6}>Beállítások</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.mmstickerbutton} onPress={ ()=>{ Linking.openURL('https://www.mmsticker.hu/')}}>
      <View style={styles.web}>
      <Image style={styles.img} source={require('../img/mmstickericon.png')}/>   
      <Text style={styles.text7}>Weboldal</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
      </ScrollView> 
      </View>
    );
    function checkBoxColor(){
      if(colorPrint){
        setColorPrice('0');
        //console.log('HAMIS colorPrice: ' + colorPrice )
        setColorCheckBoxColor('white')
        setColorPrint(false)
      }else{
        setColorCheckBoxColor('green')
        if(route.params?.colPrice === undefined){
          getColorPriceValueFor('colorPrice')
          //console.log('IGAZ, DE undefined! Route: ' + route.params?.colPrice + ' colorPrice: ' + colorPrice);
        }else{
          setColorPrice(route.params?.colPrice)
          //console.log('IGAZ, ES NEM undefined! Route: ' + route.params?.colPrice  + ' colorPrice: ' + colorPrice);
        }
        setColorPrint(true)
        //console.log('IGAZ colorPrice: ' + colorPrice )
      }
    }
  function checkBoxWhite(){
    if(whitePrint){
      setWhitePrice('0');
      setWhiteCheckBoxColor('white')
      setWhitePrint(false)
    }else{
      setWhiteCheckBoxColor('green')
      if(route.params?.whiPrice === undefined){
        getWhitePriceValueFor('whitePrice')  
      }else{
        setWhitePrice(route.params?.whiPrice)
      }
      setWhitePrint(true)
    }
  }
  function checkBoxLac(){
    if(lacPrint){
      setLacPrice('0');
      setLacCheckBoxColor('white')
      setLacPrint(false)
    }else{
      setLacCheckBoxColor('green')
      if(route.params?.laPrice === undefined){
        getLacPriceValueFor('lacPrice')  
      }else{
        setLacPrice(route.params?.laPrice)
      }
      setLacPrint(true)
    }
  }
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
  touchopcolor:{
    width:30,
    height:30,
    borderWidth:2,
    borderColor:'black',
    borderRadius:15,
    marginRight: 30,
    marginLeft: 30,
  },
  touchopwhite:{
    width:30,
    height:30,
    borderWidth:2,
    borderColor:'black',
    borderRadius:15,
    marginRight: 30,
    marginLeft: 30,
  },
  touchoplac:{
    width:30,
    height:30,
    borderWidth:2,
    borderColor:'black',
    borderRadius:15,
    marginRight: 30,
    marginLeft: 30,
  },
  text1:{
    fontWeight: 'bold',
    padding: 5,
    color: 'black',
  },
  text4:{
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  text5:{
    fontWeight: 'bold',
    padding: 5,
    color: 'green',
    textAlign: 'center',
    
  },
  text6:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,  
  },
  text7:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: '10%',
    marginVertical: 10,  
  },
  text8:{
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: 5,
    color: 'purple',
  },
  inputArea:{
    textAlign: 'center',
    flex: 1,
    marginLeft: '20%',
    marginRight: '20%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black'
  },
  text2:{
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
    fontSize: 24,
    color: '#248918',
  },
  text3:{
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: 5,
    color: 'red',
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
  },
  mmstickerbutton:{
    height: 50,
    backgroundColor: '#C51230',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
  },
  web:{
    display: 'flex',
    flexDirection:'row',
  },
  img:{
    marginTop: 3,
    marginLeft: 10,
    height: 40,
    width: 48,
  }

});

export default Home;