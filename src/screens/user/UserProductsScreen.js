import React, {useEffect} from 'react';

import { FlatList,Platform,Button,Alert  } from 'react-native';

import ProductItem from '../../components/shop/ProductItem';

import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from "../../components/UI/HeaderButton";

import * as productsActions from "../../store/actions/products"

import Colors from "../../constants/Colors";
const UserProductScreen = props =>{

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    useEffect(() => {
      
        props.navigation.setOptions({
            title:  "Your Products",
            
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
            },
            headerRight: () =>{
                return (
                    <HeaderButtons HeaderButtonComponent ={CustomHeaderButton} >
                        <Item title='Add'
                            iconName = {Platform.OS === 'android' ? 'md-create': 'ios-create' }
                            onPress = {() => {
                                props.navigation.navigate('EditProductScreen',{
                                    productId: null
                                })
                            }}
                        />
                    </HeaderButtons>

                );
            }
          
        });
    }, [props.navigation, props.route]);


    const editProductHandler = id => {
        props.navigation.navigate('EditProductScreen',{
            productId: id,

        });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {dispatch(productsActions.deleteProduct(id));     } }
        ])
    }



        return(
            <FlatList data={userProducts}
                    keyExtractor = {item => item.id}
                    renderItem={itemData => {
                    return <ProductItem
                    image={itemData.item.imageUrl}
                    title= {itemData.item.title}
                    price = {itemData.item.price}
                    onSelect={() => {}}
                >
                   <Button title="Edit"
                            color = {Colors.primary}
                            onPress={()=> {
                                editProductHandler(itemData.item.id);
                            }}
                        />
                        <Button title="Delete" 
                            color = {Colors.primary}
                            onPress={()=> {
                                deleteHandler(itemData.item.id)
                            }}
                        />
                                



                        
                </ProductItem>
                } }
            />
        );


};








  
export default UserProductScreen;