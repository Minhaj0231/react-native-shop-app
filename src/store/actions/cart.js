export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_cART'

export const addToCart = product => {
     return {type:ADD_TO_CART, payload: {product: product} };
};


export const romoveFromCart = productId => {
     
     return { type: REMOVE_FROM_CART, payload: {pid: productId}};

};

