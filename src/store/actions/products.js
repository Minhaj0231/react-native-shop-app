export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PPODUCT = 'UPDATE_PPODUCT'

export const deleteProduct = productId => {
    return {type: DELETE_PRODUCT, payload: {pid: productId}}
}

export const createProduct = (title, description, imageUrl, price) => {
    return{type: CREATE_PRODUCT,payload:{
        title,
        description,
        imageUrl,
        price

    } }
}

export const updateProduct = (id, title, description, imageUrl) => {
   
    return{type: UPDATE_PPODUCT, payload:{
        pid: id,
        title,
        description,
        imageUrl
    } }
}