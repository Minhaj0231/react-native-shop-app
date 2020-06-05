import React  from 'react';
import {Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from '../constants/Colors'

const OrdersStackNavigator = () => {
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

                     
                <Stack.Screen   name = "OrdersScreen" 
                    component ={OrdersScreen}
                                        
                />
                
            </Stack.Navigator>
           
  
     
    );
}

export default OrdersStackNavigator