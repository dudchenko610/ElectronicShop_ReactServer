
import { PRODUCT_ACTION_TYPES } from "../actions/product-actions"
import {LOAD_STATES} from "../../../../../core/load-states"

const initialState = () => {
    return {
        content: new Map(),
        paginationFilter: null,
        productFilter: null,
        state: LOAD_STATES.NONE,

        inProgressContent : new Map(), // products in progress
        addingNewState: LOAD_STATES.NONE,
        addingCounter: 0,
        
        currentProduct: null,
        stateCurrent: LOAD_STATES.NONE
        
    }
}

export const productsReducer = (state = initialState(), action) => {
    
    let product = null
    
    switch(action.type) {

        case PRODUCT_ACTION_TYPES.ADD_PRODUCT:
            return {
                ...state,
                addingCounter: state.addingCounter + 1,
                addingNewState: LOAD_STATES.LOADING
            }

        case PRODUCT_ACTION_TYPES.ADD_PRODUCT_SUCCESS:

            product = action.payload
            product.state = LOAD_STATES.READY
            
            state.inProgressContent.set(product.id, product)
            
            if (product.imageModels.length == 0) {
                state.addingCounter = state.addingCounter - 1

                if (state.addingCounter == 0) {
                    state.addingNewState = LOAD_STATES.NONE
                }
            }
            
            return {
                ...state
            }

        case PRODUCT_ACTION_TYPES.ADD_PRODUCT_FAILED:
            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter == 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            return {
                ...state
            }



        case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT:
        {

            const product = action.payload
            product.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_SUCCESS:
        {
            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED:
        {

            const product = action.payload
            product.state = LOAD_STATES.READY

            return {
                ...state
            }
        }


        case PRODUCT_ACTION_TYPES.GET_PRODUCTS:

            state.state = LOAD_STATES.LOADING
            state.content.clear()



            if (action.payload.paginationFilter) {
                state.paginationFilter = action.payload.paginationFilter
            }

            if (action.payload.productFilter) {
                state.productFilter = action.payload.productFilter
            }

            console.log(state.paginationFilter)
            console.log(state.productFilter)


            return {
                ...state
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS:

            state.state = LOAD_STATES.READY

            const pagedResponse = action.payload

            if (!state.paginationFilter) {
                state.paginationFilter = {}
            }

            state.paginationFilter.pageNumber   = pagedResponse.pageNumber
            state.paginationFilter.pageSize     = pagedResponse.pageSize
            state.paginationFilter.totalPages   = pagedResponse.totalPages
            state.paginationFilter.totalRecords = pagedResponse.totalRecords

            const products = pagedResponse.data
            products.map((product, index, array) => {
                state.content.set(product.id, product)
            })

            if (state.content.size == 0) {
                state.state = LOAD_STATES.NONE
            }

            return {
                ...state
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED:

            state.state = LOAD_STATES.FAILED
            state.content.clear()

            return {
                ...state
            }
        
        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCTS_REDUCER_ON_DOWNLOAD:
        {
            return {
                ...state
            }
        }
        
        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCTS_REDUCER_ON_UPLOAD:
        {
            
            const product = action.payload

            if (product.imageModels) {

                var ready = true

                product.imageModels.map((imageModel, index, array) => {
                    if (imageModel.state === LOAD_STATES.UPLOADING) {
                        ready = false
                    }
                }) 
    
                if (!ready) {
                    return {
                        ...state
                    }
                }
    
                state.addingCounter = state.addingCounter - 1
    
                if (state.addingCounter == 0) {
                    state.addingNewState = LOAD_STATES.NONE
                }
    
                state.inProgressContent.delete(product.id)

            }

        
            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.RESET_PRODUCTS_FILTER:

            state.paginationFilter = null
            state.productFilter = null
            state.state = LOAD_STATES.NONE

            return {
                ...state
            }



        case PRODUCT_ACTION_TYPES.GET_PRODUCT:

            state.currentProduct = null
            state.stateCurrent = LOAD_STATES.LOADING

            return {
                ...state
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_SUCCESS:

            state.currentProduct = action.payload

            if (state.currentProduct.productLike) {
                state.currentProduct.productLike.state = LOAD_STATES.READY
            }
            
            state.stateCurrent = LOAD_STATES.READY

            return {
                ...state
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_FAILED:

            state.currentProduct = null

            if (action.payload) {
                state.stateCurrent = LOAD_STATES.NONE
            } else {
                state.stateCurrent = LOAD_STATES.FAILED
            }
            
            return {
                ...state
            }


        
        case PRODUCT_ACTION_TYPES.LIKE_PRODUCT:
        case PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT:
        case PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK:
        {
            const product = action.payload
            
            product.productLike = {
                ...product.productLike,
                state: LOAD_STATES.LOADING
            }

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.LIKE_PRODUCT_SUCCESS:
        {

            const product = action.payload
            const productLike = product.productLike
            const lastProductLike = product.lastProductLike

            productLike.state = LOAD_STATES.READY

            if (lastProductLike && lastProductLike.userId && !lastProductLike.like) {
                product.dislikeCount --
            }

            product.likeCount ++

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT_SUCCESS:
        {
            const product = action.payload
            const productLike = product.productLike
            const lastProductLike = product.lastProductLike


            productLike.state = LOAD_STATES.READY

            console.log(productLike)

            if (lastProductLike && lastProductLike.userId && lastProductLike.like) {
                product.likeCount --
            }

            product.dislikeCount ++

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK_SUCCESS:
        {
            
            const product = action.payload

            const productLike = product.productLike

            console.log(productLike)

            if (productLike.userId && productLike.like) {
                product.likeCount --
            }

            if (productLike.userId && !productLike.like) {
                product.dislikeCount --
            }

            product.productLike = {
                state: LOAD_STATES.READY
            }

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.LIKE_PRODUCT_FAILED:
        case PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT_FAILED:
        case PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK_FAILED:
        {
            // just cancel loading state
            const product = action.payload
            
            product.productLike = {
                ...product.productLike,
                state: LOAD_STATES.READY
            }

            return {
                ...state
            }
        }



        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT:
        {

            const product = action.payload
            product.state = LOAD_STATES.LOADING
            
            state.inProgressContent.set(product.id, product)

            return {
                ...state,
                addingCounter: state.addingCounter + 1,
                addingNewState: LOAD_STATES.LOADING
            }
        }

        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS:
        {

            const product = action.payload.product
            const newImageModels = action.payload.imageModels
            product.state = LOAD_STATES.READY
            
            
            if (newImageModels.length == 0) {
                state.inProgressContent.delete(product.id)
                state.addingCounter = state.addingCounter - 1

                if (state.addingCounter == 0) {
                    state.addingNewState = LOAD_STATES.NONE
                }
            }

            return {
                ...state
            }
        }

        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED:
        {
            state.addingCounter = state.addingCounter - 1
            state.inProgressContent.delete(product.id)

            if (state.addingCounter == 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            return {
                ...state
            }
        }

    }

    return state
}
