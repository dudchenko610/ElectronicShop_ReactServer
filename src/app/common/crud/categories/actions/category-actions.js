import React from "react"
import {crudApi} from "../../../../../core/api"
import {store} from "../../../../../index"

import {PopupListener} from "../../../../../core/popup-utils"
import ProgressBar from "../../../components/ProgressBar"

import {showAlertPopupAction, hidePopupAction, showAlertPopupXAction} from "../../../actions/popup-actions"
import { getProductsAction } from "../../products/actions/product-actions"

export const CATEGORY_ACTION_TYPES = {

    GET_ALL_CATEGORIES: "GEAT_ALL_CATEGORIES",
    GET_ALL_CATEGORIES_SUCCESS: "GET_ALL_CATEGORIES_SUCCESS",
    GET_ALL_CATEGORIES_FAILED: "GET_ALL_CATEGORIES_FAILED",


    GET_CATEGORY: "GET_CATEGORY",
    GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
    GET_CATEGORY_FAILED: "GET_CATEGORY_FAILED",

    ADD_CATEGORY: "ADD_CATEGORY",
    ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
    ADD_CATEGORY_FAILED: "ADD_CATEGORY_FAILED",

    REMOVE_CATEGORY: "REMOVE_CATEGORY",
    REMOVE_CATEGORY_SUCCESS: "REMOVE_CATEGORY_SUCCESS",
    REMOVE_CATEGORY_FAILED: "REMOVE_CATEGORY_FAILED",

    UPDATE_CATEGORY: "UPDATE_CATEGORY",
    UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
    UPDATE_CATEGORY_FAILED: "UPDATE_CATEGORY_FAILED"

}

export const getCategoriesAction = (callbackFunc = null) => {
    return dispatch => {

        dispatch({
            type: CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES
        })

        crudApi().getCategories()
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES_FAILED
                        })

                        if (callbackFunc) {
                            callbackFunc.onError(res.data.error)
                        }

                        return
                    }

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES_SUCCESS,
                        payload: res.data
                    })

                    if (callbackFunc) {
                        callbackFunc.onSuccess()
                    }
                }
            )
            .catch(
                err => {
                    console.log(err)

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES_FAILED
                    })

                    if (callbackFunc) {
                        callbackFunc.onError(err.error)
                    }
                }
            )
    }
}

export const addCategoryAction = (data) => {
    return dispatch => {
      

        dispatch({
            type: CATEGORY_ACTION_TYPES.ADD_CATEGORY
        })

        crudApi().addCategory(data)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: CATEGORY_ACTION_TYPES.ADD_CATEGORY_FAILED
                        })

                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{res.data.error}</label></div>)))
                        // show error popup

                        return
                    }

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.ADD_CATEGORY_SUCCESS,
                        payload: res.data
                    })
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CATEGORY_ACTION_TYPES.ADD_CATEGORY_FAILED
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{err.error}</label></div>)))
                    // show error popup

                }
            )

    }
}

export const updateCategoryAction = (categoryOld, categoryNew) => {
    return dispatch => {

        categoryNew.id = categoryOld.id

        dispatch({
            type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY,
            payload: categoryOld
        })

        crudApi().updateCategory(categoryNew)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED,
                            payload: categoryOld
                        })
    
                        dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>{res.data.error}</label></div>)))
    
                        return
                    }

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS,
                        payload: {
                            old: categoryOld,
                            new: categoryNew
                        }
                    })

                    
                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED,
                        payload: categoryOld
                    })

                    dispatch(showAlertPopupAction({width: 300, height:100}, (<div><label>Неудалось обновить категорию. Попробуйте еще раз</label></div>)))

                }
            )

    }
}

export const removeCategoryAction = (category) => {
    return dispatch => {

        dispatch({
            type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY,
            payload: category
        })

//        console.log(category)

        crudApi().removeCategory( { id: category.id } )
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED,
                            payload: category

                        })

                        
                        dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{res.data.error}</label></div>)))

                        return
                    }

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_SUCCESS,
                        payload: category
                    })

                    dispatch(
                        getProductsAction()
                    )

                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div>Категория успешно удалена</div>)))

                }
            )
            .catch(
                err => {
                    dispatch({
                        type: CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED,
                        payload: category
                    })

                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>{err}</label></div>)))

                    // show error popup
                }
            )

    }
}

export const getCategoryAction = (categoryId) => {
    return dispatch => {
        dispatch({
            type: CATEGORY_ACTION_TYPES.GET_CATEGORY,
            payload: categoryId
        })

        crudApi().getCategory(categoryId)
            .then(
                res => {

                    
                    if (res.data.error) {

                        console.log(res.data.error)

                        dispatch({
                            type: CATEGORY_ACTION_TYPES.GET_CATEGORY_FAILED,
                            payload: categoryId
                        })

                        return
                    }

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.GET_CATEGORY_SUCCESS,
                        payload: res.data
                    })
                }
            )
            .catch(
                err => {

                    console.log(err)

                    dispatch({
                        type: CATEGORY_ACTION_TYPES.GET_CATEGORY_FAILED,
                        payload: categoryId
                    })
                }
            )

    }
}

// popup listeners

export const categoriesListener = (onSuc = null) => {

    const categoriesListener = new PopupListener(
        <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>,
        { width: 400, height: 200},
    
        (errorMessage) => {
            return (
                <div>
                    <p>Get categories error</p>
                    <p>{errorMessage}</p>
        
                    <a onClick={() => {
                        categoriesListener.onRepeat()
                    }}>Repeat</a>
        
                    <a onClick={() => {
                        store.dispatch(categoriesListener.hide(categoriesListener.errorDivWithError))
                    }}>Cancel</a>
        
                </div>
            )
        },
        { width: 400, height: 200},
    
        hidePopupAction,
        showAlertPopupAction,
        getCategoriesAction,
        null,
        onSuc
    
    )

    return categoriesListener

}