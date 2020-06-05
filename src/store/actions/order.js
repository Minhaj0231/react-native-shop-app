export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmmont) => {
    return {
        type: ADD_ORDER, 
        payload: { items: cartItems, amount: totalAmmont}
    };
};