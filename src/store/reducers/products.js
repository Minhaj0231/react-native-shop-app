import   PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PPODUCT } from '../actions/products';
import Product from '../../models/product';

const initalState = {
    availableProducts:  PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerid === 'u1')

};


export default productsReducer = (state = initalState, action) => {

    switch (action.type) {
        case CREATE_PRODUCT:
            const newProduct = new Product(new Date().toString(),
            'u1',
            action.payload.title, 
            action.payload.imageUrl,
            action.payload.description,
            action.payload.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PPODUCT:
            const productIndex = state.userProducts.findIndex( prod => prod.id === action.payload.pid )
            const updatedProduct = new Product( 
                action.payload.pid, 
                state.userProducts[productIndex].ownerid,
                action.payload.title,
                action.payload.imageUrl,
                action.payload.description,
                state.userProducts[productIndex].price,
                );

                const updatedUserProducts = [...state.userProducts];
                 updatedUserProducts[productIndex] = updatedProduct;
                

                 const availableProductIndex = state.availableProducts.findIndex( prod => prod.id === action.payload.pid )

                 const updatedAvailableProducts = [...state.availableProducts];

                 updatedAvailableProducts[availableProductIndex] = updatedProduct;

                 return {
                        ...state,
                        userProducts: updatedUserProducts,
                        availableProducts:  updatedAvailableProducts
                 }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.payload.pid),
                availableProducts:  state.availableProducts.filter(product => product.id !== action.payload.pid)
            }

        
            
      
    }
    return state;
}
