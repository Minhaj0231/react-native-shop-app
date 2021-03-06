import React, {useEffect}from 'react';

import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';

import {useSelector, useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart'

import Colors from '../../constants/Colors'

const ProductDetailScreen = props =>{
    const productId = props.route.params.productId
    
    const SeletedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))


    const dispatch = useDispatch();

    useEffect(() => {
      
        props.navigation.setOptions({
          title:  props.route.params.productTitle
    
        });
      }, [props.navigation, props.route]);
    
    return (
        <ScrollView>
          <Image style= {styles.image}  source={{uri: SeletedProduct.imageUrl}} />
          <View  style = {styles.actions}> 
          <Button color= {Colors.primary}  title = "Add to Cart" onPress = { () => {
            
             dispatch(cartActions.addToCart(SeletedProduct));
          }}/>
          </View>
            
          <Text style = {styles.price}>${SeletedProduct.price.toFixed(2)}</Text>
          <Text style = {styles.description}>{SeletedProduct.description}</Text>

        </ScrollView>
    );
};


ProductDetailScreen.navigation



const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 300

    },
    actions:{
      marginVertical:10,
      alignItems: 'center'

    },
    price: {
      fontFamily : 'open-sans-bold',
      fontSize: 20,
      color: "#888",
      textAlign: 'center',  
      marginVertical: 20 
    },
    description: {
      fontFamily : 'open-sans',
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20
    }
  });

  
export default ProductDetailScreen;