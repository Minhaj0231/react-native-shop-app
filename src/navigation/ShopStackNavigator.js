import React  from 'react';

import {Platform} from 'react-native';



import { createStackNavigator } from '@react-navigation/stack';

import  ProductOvervierScreen from '../screens/shop/ProductOverviewScreen'
import  ProductDetailScreen  from '../screens/shop/ProductDetailScreen'
import CartScreen from "../screens/shop/CartScreen";
import Colors from '../constants/Colors'

const Stack = createStackNavigator();


const ShopStackNavigator = () => {
    return(
                 
            <Stack.Navigator

                screenOptions={{
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android'? Colors.primary : ''
                    },
                    headerTitleStyle:{
                        fontFamily: 'open-sans-bold'
                    },
                    headerBackTitleStyle:{
                        fontFamily: 'opne-sans'
                    },
                    headerTintColor: Platform.OS === 'android'? 'white' : Colors.primary
                }}
                 >

                     
                <Stack.Screen   name = "ProductOverviewScreen" 
                    component ={ProductOvervierScreen}
                    
                    
                />
                <Stack.Screen  name = "ProductDetailScreen"
                    component = {ProductDetailScreen}

                />
                <Stack.Screen  name = "CartScreen"
                    component = {CartScreen}

                />
            </Stack.Navigator>
           
  
     
    );
}

export default ShopStackNavigator