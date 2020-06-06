import React, {useEffect, useCallback, useReducer} from 'react';

import {View ,StyleSheet,  ScrollView, Platform, Alert, KeyboardAvoidingView} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {useSelector, useDispatch  } from 'react-redux';

import * as productsActions from "../../store/actions/products";

import Input from '../../components/UI/Input'

const Form_Update = 'FORM_INPUT_UPDATE'



const formReducer = (state, action) => {
    switch (action.type) {
        case Form_Update:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]:action.isValid
            }
            let updatedformIsValid = true;
            for( const Key in updatedValidities){
                updatedformIsValid = updatedformIsValid && updatedValidities[Key];
            }

            return {
                formIsValid: updatedformIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            }
              
        default:
            return state;
    }
};


const EditProductScreen = props =>{

    const dispatch = useDispatch()
  

    const isEdit = props.route.params.productId !== null ? true : false
    const prodId =  props.route.params.productId !== null ?  props.route.params.productId: -1
    const screenTitlte = isEdit ? 'Edit Product': 'Add Product' 

    const initialState = {
        inputValues: {
            title: isEdit ? editedProduct.title : '',
            imageUrl:isEdit ? editedProduct.imageUrl : '' ,
            price: '',
            description: isEdit ? editedProduct.description : '' ,
        },
        inputValidities: {
            title: isEdit ? true : false,
            imageUrl:isEdit ? true : false ,
            price: isEdit ? true : false,
            description: isEdit ? true : false ,
        },
        formIsValid: isEdit ? true : false
    }

    const [formState, dispatchFormState] =  useReducer( formReducer, initialState)

    
    let editedProduct = useSelector(state => state.products.userProducts.find( prod => prod.id === prodId ));
    
    


    

    const submitHandler = useCallback( () => {
        if(!formState.formIsValid){
            Alert.alert('Wrong input', 'Please check the erros in the form.',[
                {text: 'Okey'}
            ]);
            return;
        }
        if(isEdit){
            

            dispatch(productsActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl ))
        } 
        else{
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price ))
        }
        props.navigation.goBack();
    },[ dispatch, formState  ])

      
    
   
    
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

    
    const inputChangeHandler = useCallback((inputIdentifier,inputValue, inputValidity) => {
        
        
        dispatchFormState({
            type: Form_Update,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    },[dispatchFormState]);
    
    return (
        <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset= {5} >
       <ScrollView>
            <View style = {styles.form}>
               
                <Input
                    id= 'title'
                    label = 'Title'
                    errorText = 'Please enter a valid title!'
                    keyboardType = "default"
                    autoCapitalize = "sentences"
                    autoCorrect
                    returnKeyType='next'
                    onInputChange= { inputChangeHandler}
                    initialValue = {isEdit ? editedProduct.title : ''}
                    initiallyValid = {isEdit}
                    required
               />   

                <Input
                    id='imageUrl'
                    label = 'Image Url'
                    errorText = 'Please enter a valid image url!'
                    keyboardType = "default"
                    returnKeyType='next'
                    onInputChange= { inputChangeHandler}
                    initialValue = {isEdit ? editedProduct.imageUrl : ''}
                    initiallyValid = {!!isEdit}
                    required
               
               />   
               
                { isEdit? null:   (
                     <Input
                        id= 'price'
                        label = 'Price'
                        errorText = 'Please enter a valid price!'
                        keyboardType = 'decimal-pad'
                        returnKeyType='next'
                        onInputChange= { inputChangeHandler}
                        required
                    />   

                )}
                <Input
                    id= 'description'
                    label = 'Description'
                    errorText = 'Please enter a valid description!'
                    keyboardType = "default"
                    autoCapitalize = "sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange= { inputChangeHandler}
                    initialValue = {isEdit ? editedProduct.description : '' }
                    initiallyValid = {!!isEdit}
                    required
               />  

            </View>
       </ScrollView>
       </KeyboardAvoidingView>
    )
};






const styles = StyleSheet.create({
    form:{
        margin: 20
    },
    
  });

  
export default EditProductScreen;