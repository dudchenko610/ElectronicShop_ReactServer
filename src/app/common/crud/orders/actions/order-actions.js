

export const ORDER_ACTION_TYPES = {

    GET_MY_ORDERS: "GET_MY_ORDERS",
    GET_MY_ORDERS_SUCCESS: "GET_MY_ORDERS_SUCCESS",
    GET_MY_ORDERS_FAILED: "GET_MY_ORDERS_FAILED",

    ADD_ORDER: "ADD_ORDER",
    ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
    ADD_ORDER_FAILED: "ADD_ORDER_FAILED",

    ADD_ORDER_ITEM_TO_BASKET: "ADD_ORDER_ITEM_TO_BASKET",
    REMOVE_ORDER_ITEM_FROM_BASKET: "REMOVE_ORDER_ITEM_FROM_BASKET"

}

export const addOrderItemToBasketAction = (product, count) => {

    return dispatch => {
        dispatch({
            type: ORDER_ACTION_TYPES.ADD_ORDER_ITEM_TO_BASKET,
            payload: {
                product: product,
                count: count
            }
        })
    }
}

export const removeOrderItemFromBasketAction = (index) => {
    return dispatch => {
        dispatch({
            type: ORDER_ACTION_TYPES.REMOVE_ORDER_ITEM_FROM_BASKET,
            payload: index
        })
    }
}