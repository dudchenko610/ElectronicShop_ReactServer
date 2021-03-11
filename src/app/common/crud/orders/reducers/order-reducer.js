import { removeAt } from "../../../../../core/array-methods"
import { getListFromStorage, saveObjectToStorage } from "../../../../../core/local-storage-handler"
import { ORDER_ACTION_TYPES } from "../actions/order-actions"


const initialState = () => {
    return {
        
    }
}

export const orderReducer = (state = initialState(), action) => {
    switch (action.type) {
        case ORDER_ACTION_TYPES.ADD_ORDER_ITEM_TO_BASKET: 
        {

            const orderItemsList = getListFromStorage("orderItemsList")
            const data = action.payload

            const orderItem = {
                count: data.count,
                productId: data.product.id,
                name: data.product.name,
                price: data.product.price
            }

            orderItemsList.push(orderItem)

            saveObjectToStorage("orderItemsList", orderItemsList)

            return { ...state }
        }

        case ORDER_ACTION_TYPES.REMOVE_ORDER_ITEM_FROM_BASKET:
        {
            const index = action.payload

            const orderItemsList = getListFromStorage("orderItemsList")
            removeAt(orderItemsList, index)

            saveObjectToStorage("orderItemsList", orderItemsList)

            return { ...state }
        }
    }

    return state
}