import React  from 'react';

import {Platform} from 'react-native';



import { createStackNavigator } from '@react-navigation/stack';

import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from '../constants/Colors'

const Stack = createStackNavigator();


const AdminStackNavigator = () => {
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

                     
                <Stack.Screen   name = "UserProductsScreen" 
                    component ={UserProductsScreen}
                    
                    
                />

                <Stack.Screen   name = "EditProductScreen" 
                    component ={EditProductScreen}
                    
                    
                />
                
                
                
            </Stack.Navigator>
           
  
     
    );
}

export default AdminStackNavigator 