import React  from 'react';

import {Platform  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from "@react-navigation/drawer";

import  ShopStackNavigator  from './ShopStackNavigator'
import OrdersStackNavigator from "./OrdersStackNavigator";

import AdminStackNavigator from "./AdminStackNavigator";

import { Ionicons } from "@expo/vector-icons";


const Drawer = createDrawerNavigator();

const RootNavigator = props => {
    return(
        <NavigationContainer>

            <Drawer.Navigator initialRouteName="products">
                <Drawer.Screen name="products" 
                    component={ShopStackNavigator} 

                    options={{
                        drawerIcon :  drawerConfig => (
                            <Ionicons 
                            name = {Platform.OS === 'android'? 'md-cart' : 'ios-cart' }
                            size = {23}
                            color={drawerConfig.tintColor}
                            />
                            )
                            
                    }}
               
                
                />
                <Drawer.Screen name="Orders"
                    component={OrdersStackNavigator}
                    
                    options={{
                        drawerIcon :  drawerConfig => (
                            <Ionicons 
                            name = {Platform.OS === 'android'? 'md-list' : 'ios-list' }
                            size = {23}
                            color={drawerConfig.tintColor}
                            />
                            )
                            
                    }}
                    
                 />

                <Drawer.Screen name="Admin"
                    component={AdminStackNavigator}
                    
                    options={{
                        drawerIcon :  drawerConfig => (
                            <Ionicons 
                            name = {Platform.OS === 'android'? 'md-create' : 'ios-create' }
                            size = {23}
                            color={drawerConfig.tintColor}
                            />
                            )
                            
                    }}
                 
                 />
            </Drawer.Navigator>

        </NavigationContainer>
    );
    
}


export default RootNavigator;