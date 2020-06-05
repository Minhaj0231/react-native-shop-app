import React, {useEffect} from 'react';

import {View, Text, FlatList, Button, StyleSheet} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Colors from "../../constants/Colors";

import CartItem from  '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import Card from '../../components/UI/Card'

import * as orderActions from '../../store/actions/order';
const CartScreen = props =>{

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedItems = [];
        for(const key in state.cart.items){
            transformedItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedItems.sort((a,b) => a.productId > b.productId ? 1: -1);
    });

    const dispatch = useDispatch();
    useEffect(() => {
      
        props.navigation.setOptions({
          title:  "your Cart"
    
        });
      }, [props.navigation, props.route]);


    return(
        <View style ={styles.screen}>
            <Card style ={styles.summery}>
                <Text style ={styles.summeryText}>
                    Total: <Text style ={styles.amount} >${Math.round(cartTotalAmount.toFixed(2) * 100) / 100} </Text> 
                     </Text>
                <Button color={Colors.accent} 
                title="Order Now"
                disabled={cartItems.length === 0}
                onPress={()=>{
                    dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
                }}
                />
            </Card>
           <View>
               <FlatList 
               data={cartItems}
               keyExtractor={item=> item.productId}
               renderItem = {itemData =><CartItem
                quantity = {itemData.item.quantity}
                title = {itemData.item.productTitle}
                amount= {itemData.item.sum}
                deletable
                onRemove= {()=>{
                    dispatch(cartActions.romoveFromCart(itemData.item.productId));
                }}
                />}
               />
           </View>
        </View>
    );

};






const styles = StyleSheet.create({
    screen:{
        margin: 20
    },
    summery:{
               
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    
    
    },
    summeryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color:Colors.primary
    }


  });

  
export default CartScreen;