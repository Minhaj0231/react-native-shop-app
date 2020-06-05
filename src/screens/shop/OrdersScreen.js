import React, {useEffect} from 'react';

import {FlatList,Text, Platform} from 'react-native';
import {useSelector} from 'react-redux'

import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";

import  OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props =>{
    const orders = useSelector(state => state.orders.orders);


    useEffect(() => {
      
        props.navigation.setOptions({
            title:  "Your Orders",
            headerLeft: () =>{
                return (
                    <HeaderButtons HeaderButtonComponent ={CustomHeaderButton} >
                        <Item title='menu'
                            iconName = {Platform.OS === 'android' ? 'md-menu': 'ios-menu' }
                            onPress = {() => {
                                props.navigation.toggleDrawer();
                            }}
                        />
                    </HeaderButtons>

                );
        }
    
        });
    }, [props.navigation, props.route]);

    return(
        <FlatList data={orders}
        keyExtractor = {item => item.id}
    renderItem = {itemData => <OrderItem 
    amount={itemData.item.totalAmount}
    date = {itemData.item.readableDate}
    items={itemData.item.items}

    />
    }
        />
    );

};








  
export default OrdersScreen;