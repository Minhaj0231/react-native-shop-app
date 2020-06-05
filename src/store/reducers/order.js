import { ADD_ORDER } from '../actions/order';
import Order from '../../models/order';


const initialState = {
    orders: []
};


export default ordersReducer =(state = initialState, action ) => {

    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),
                action.payload.items, 
                action.payload.amount,
                new Date()
            );
            return{
                ...state,
                orders: [...state.orders, newOrder ]
            }
    }

    return state;
}