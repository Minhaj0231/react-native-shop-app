import React, {useEffect, useState, useCallback} from 'react';

import {View,Text ,StyleSheet, TextInput, ScrollView, Platform} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch  } from 'react-redux';

import * as productsActions from "../../store/actions/products";

const EditProductScreen = props =>{

    const dispatch = useDispatch()

    const isEdit = props.route.params.productId !== null ? true : false
    const prodId =  props.route.params.productId !== null ?  props.route.params.productId: -1
    const screenTitlte = isEdit ? 'Edit Product': 'Add Product' 
    
    let editedProduct = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId ));
    
    const [title, setTitle] = useState( isEdit ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(isEdit ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(isEdit ? editedProduct.description : '');


    

    const submitHandler = useCallback( () => {
        if(isEdit){
            

            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl ))
        } 
        else{
            dispatch(productsActions.createProduct(title, description, imageUrl, +price ))
        }
        props.navigation.goBack();
    },[ dispatch,title,description,imageUrl,price  ])

      
    
   
    
    useEffect(() => {
        
      
        props.navigation.setOptions({
            title:   screenTitlte,
            headerRight: () =>{
                return (
                    <HeaderButtons HeaderButtonComponent ={CustomHeaderButton} >
                        <Item title='Save'
                            iconName = {Platform.OS === 'android' ? 'md-checkmark': 'ios-checkmark' }
                            onPress = {submitHandler}
                        />
                    </HeaderButtons>

                );
            }
           
          
        });
    }, [props.navigation, props.route,submitHandler]);

    


    return (
       <ScrollView>
            <View style = {styles.form}>
                <View style= {styles.formControl}>
                    <Text  style= {styles.lable}>Title</Text>
                    <TextInput style = {styles.input} 
                    value ={title} 
                    onChangeText = {text => setTitle(text)}
                    />
                </View>
                <View style= {styles.formControl}>
                    <Text  style= {styles.lable}>Image URL</Text>
                    <TextInput style = {styles.input} 
                    value ={imageUrl} 
                    onChangeText = {text => setImageUrl(text)}
                    />
                </View>
                { isEdit? null:   <View style= {styles.formControl}>
                    <Text  style= {styles.lable}>Price</Text>
                    <TextInput style = {styles.input} 
                    value ={price} 
                    onChangeText={text => setPrice(text)}
                    />
                </View>

                }
                <View style= {styles.formControl}>
                    <Text  style= {styles.lable}>Description</Text>
                    <TextInput style = {styles.input} 
                    value ={description} 
                    onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
       </ScrollView>
    )
};






const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    lable:{
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }
  });

  
export default EditProductScreen;