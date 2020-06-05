import React, { useEffect } from 'react'
import {View,FlatList,StyleSheet, Platform, Button } from 'react-native';

import {useSelector, useDispatch } from 'react-redux';

import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from '../../store/actions/cart'

import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";

import Colors from '../../constants/Colors';
const ProductOvervierScreen = props => {
    const products = useSelector(state => {return state.products.availableProducts});
  
    const dispatch = useDispatch();

    useEffect(() => {
      
        props.navigation.setOptions({
            title:  "ALL Products",
            headerRight: () =>{
                return (
                    <HeaderButtons HeaderButtonComponent ={CustomHeaderButton} >
                        <Item title='Cart'
                            iconName = {Platform.OS === 'android' ? 'md-cart': 'ios-cart' }
                            onPress = {() => {
                                props.navigation.navigate('CartScreen')
                            }}
                        />
                    </HeaderButtons>

                );
            },
            headerLeft: () =>{
                return (
                    <HeaderButtons HeaderButtonComponent ={CustomHeaderButton} >
                        <Item title='Menu'
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

    const SelectItemHandler = (id,title) => {
        props.navigation.navigate("ProductDetailScreen" ,{
            productId: id, 
            productTitle: title
        });
    };

    return (
        <View >
            <FlatList 
                data = {products}
                keyExtractor={item => item.id}
                renderItem={itemData => <ProductItem 
                    image ={itemData.item.imageUrl}
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onSelect = {()=> {
                        SelectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                    
                >
                    <Button title="View Details"
                            color = {Colors.primary}
                            onPress={()=> {
                                SelectItemHandler(itemData.item.id, itemData.item.title)
                            }}
                        />
                        <Button title="To Cart" 
                            color = {Colors.primary}
                            onPress={()=>{
                       
                                dispatch(cartActions.addToCart(itemData.item));
                                
                            }}
                        />

                </ProductItem>}

            />
       
       </View>
        
    );
};


const styles = StyleSheet.create({

   
    
});


export default ProductOvervierScreen;