import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import  {createStore, combineReducers} from 'redux'

import { Provider} from 'react-redux'

import productsReducer from './src/store/reducers/products'
import  cartReducer from './src/store/reducers/cart'
import oordersReducer from './src/store/reducers/order'

import  RootNavigator  from './src/navigation/RootNavigator'

import {AppLoading} from 'expo';

import * as Font from 'expo-font'



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: oordersReducer
  

});

const store = createStore(rootReducer)

const fetchFonts = () =>{
  
 return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return (<AppLoading startAsync = {fetchFonts} onFinish ={() => {
      
      setFontLoaded(true);
    }} 
    
    />
);
  }
    return (
      <Provider store = {store}>
        <RootNavigator />
      </Provider>
      
  
    );
  
 
}


