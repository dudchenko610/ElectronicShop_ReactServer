import React from "react"
import {crudApi} from "../../../../../core/api"

import {store} from "../../../../../index" 

import { uploadProductPhotoApi } from "../../../../../core/api"
import {PathModel} from "../../../components/image/data-model/PathModel"

import { uploadImageAction, downloadImageAction } from "../../../components/image/actions/image-actions"
import {showAlertPopupXAction} from "../../../../common/actions/popup-actions" 
import { ImageModel } from "../../../components/image/data-model/ImageModel"

import { getCategoryAction } from "../../categories/actions/category-actions"
import { getManufacturerAction } from "../../manufacturers/actions/manufacturer-actions"
import { getCharacteristicAction } from "../../characteristics/actions/characteristic-actions"
import { insertCharacteristicValue } from "../../characteristic-values/actions/characteristic-value-actions"
import { LOAD_STATES } from "../../../../../core/load-states"

import { resetCommentReducerAction } from "../../comments/actions/comment-actions"
import ProgressBar from "../../../components/ProgressBar"

export const PRODUCT_ACTION_TYPES = {

    GET_PRODUCTS: "GET_PRODUCTS",
    GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
    GET_PRODUCTS_FAILED: "GET_PRODUCTS_FAILED",

    GET_PRODUCT: "GET_PRODUCT",
    GET_PRODUCT_SUCCESS: "GET_PRODUCT_SUCCESS",
    GET_PRODUCT_FAILED: "GET_PRODUCT_FAILED",


    ADD_PRODUCT: "ADD_PRODUCT",
    ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_FAILED: "ADD_PRODUCT_FAILED",

    REMOVE_PRODUCT: "REMOVE_PRODUCT",
    REMOVE_PRODUCT_SUCCESS: "REMOVE_PRODUCT_SUCCESS",
    REMOVE_PRODUCT_FAILED: "REMOVE_PRODUCT_FAILED",

    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",
    UPDATE_PRODUCT_FAILED: "UPDATE_PRODUCT_FAILED",

    UPDATE_PRODUCTS_REDUCER_ON_DOWNLOAD: "UPDATE_PRODUCTS_REDUCER_ON_DOWNLOAD",
    UPDATE_PRODUCTS_REDUCER_ON_UPLOAD: "UPDATE_PRODUCTS_REDUCER_ON_UPLOAD",

    RESET_PRODUCTS_FILTER: "RESET_PRODUCTS_FILTER",


    LIKE_PRODUCT: "LIKE_PRODUCT",
    LIKE_PRODUCT_SUCCESS: "LIKE_PRODUCT_SUCCESS",
    LIKE_PRODUCT_FAILED: "LIKE_PRODUCT_FAILED",

    DISLIKE_PRODUCT: "DISLIKE_PRODUCT",
    DISLIKE_PRODUCT_SUCCESS: "DISLIKE_PRODUCT_SUCCESS",
    DISLIKE_PRODUCT_FAILED: "DISLIKE_PRODUCT_FAILED",

    TAKE_REACTION_BACK: "TAKE_REACTION_BACK",
    TAKE_REACTION_BACK_SUCCESS: "TAKE_REACTION_BACK_SUCCESS",
    TAKE_REACTION_BACK_FAILED: "TAKE_REACTION_BACK_FAILED",

}

const no_product = require("../../../../../media/no-product.png");
const no_productWidth = 600
const no_productHeight = 600

export const updateProductAction = (productOld, newImageModels, charValuesMap, productNew) => {
    return dispatch => {

        

        console.log("productOld")
        console.log(productOld)

        console.log("charValuesMap")
        console.log(charValuesMap)

        console.log("productNew")
        console.log(productNew)

        const updatedProduct = { ...productNew }
        updatedProduct.imageModels = []
        updatedProduct.mainPhotoImageModel = null
        updatedProduct.productPhotos = []
        updatedProduct.N_N_Product_Characteristics = []

        dispatch({
            type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT,
            payload: updatedProduct
        })

        charValuesMap.forEach((charValId, charId)=> { // (value, key)
            updatedProduct.N_N_Product_Characteristics.push(
                {
                    characteristicValueId : charValId
                }
            )
        })

        // photos logic
        const newImageModelsArray = []

        updatedProduct.productMainPhotoId = 0

        productNew.imageModels.map((imageModel, index, array) => { // old images, some of them will be removed

            if (imageModel.isMain) {
                updatedProduct.productMainPhotoId = imageModel.productPhoto.id
                updatedProduct.mainPhotoImageModel = imageModel
            }

            if (imageModel.toRemoveImg) {
                updatedProduct.productPhotos.push(imageModel.productPhoto)
            } else {
                newImageModelsArray.push(imageModel)
            }
        })
        
        newImageModels.map((imageModel, index, array) => {
            newImageModelsArray.push(imageModel)

            if (imageModel.isMain) {
                updatedProduct.mainPhotoImageModel = imageModel
            }
        })

        if (!updatedProduct.mainPhotoImageModel) {
            const imageModel = formProductImageModel(updatedProduct, null)
            updatedProduct.mainPhotoImageModel = imageModel
        }

        const updatedProductToSend = {
            ...updatedProduct,
            mainPhotoImageModel: null
        }

        crudApi().updateProduct(updatedProductToSend)
            .then(
                res => {
                    if (res.data.error) {

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED,
                            payload: updatedProduct
                        })

                        dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>Неудалось обновить продукт! { res.data.error }</label></div>)))

                        return
                    }

                    updatedProduct.imageModels = newImageModelsArray

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
                        payload: {
                            product: updatedProduct,
                            imageModels: newImageModels
                        }
                    })

                    dispatch(uploadProductPhotosAction(newImageModels, updatedProduct))


                }
            )
            .catch(
                err => {

                    console.log(err)

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAILED,
                        payload: updatedProduct
                    })

                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>Неудалось обновить продукт!</label></div>)))


                }
            )

    }
}


export const addProductAction = (product, imageModels, charValuesMap) => {

    return dispatch => {

        product.N_N_Product_Characteristics = []

        charValuesMap.forEach((charValId, charId)=> { // (value, key)
            product.N_N_Product_Characteristics.push(
                {
                    characteristicValueId : charValId
                }
            )
        })

     //   console.log(product)

        dispatch({
            type: PRODUCT_ACTION_TYPES.ADD_PRODUCT,
            payload: product
        })

        crudApi().addProduct(product)
            .then(
                res => {

                    if (res.data.error) {
                        dispatch({
                            type: PRODUCT_ACTION_TYPES.ADD_PRODUCT_FAILED,
                            payload: product
                        })

                        dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>Неудалось добавить продукт!</label></div>)))


                        console.log("Product was not added")
                    //    console.log(res.data)

                        return
                    }

                  //  console.log("Product was sucessfully added")
                 //   console.log(res.data)

                    const prdct = {
                        ...product,
                        id: res.data.id
                    }

                    prdct.imageModels = imageModels

                    imageModels.map((imageModel, index, array) => {
                        if (imageModel.isMain) {
                            prdct.mainPhotoImageModel = imageModel
                        }
                    })

                    if (!prdct.mainPhotoImageModel) {
                        const imageModel = formProductImageModel(prdct, null)
                        prdct.mainPhotoImageModel = imageModel
                    }
                    prdct.n_N_Product_Characteristics = []

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.ADD_PRODUCT_SUCCESS,
                        payload: prdct
                    })
                    
                    dispatch(uploadProductPhotosAction(imageModels, prdct))

                }
            )
            .catch(
                err => {
                    console.log("Product was not added")
                    console.log(err)

                    dispatch(showAlertPopupXAction({width: 300, height:100}, (<div><label>Неудалось добавить продукт!</label></div>)))

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.ADD_PRODUCT_FAILED,
                        payload: product
                    })
                }
            ) 
    }
}

export const getProductsAction = (paginationFilter = null, productFilter = null) => {
    
    return dispatch => {
        
        const payload = { }
        payload.paginationFilter = paginationFilter ? { ...paginationFilter } : null
        payload.productFilter = productFilter ? { ...productFilter } : null
        

        dispatch({
            type: PRODUCT_ACTION_TYPES.GET_PRODUCTS,
            payload: payload
        })

        const state = store.getState()
        const pagFilter = state.productsReducer.paginationFilter
        const prodFilter = state.productsReducer.productFilter

        crudApi().getProducts(pagFilter, prodFilter)
            .then(
                res => {

                    const pagedData = res.data

                    if (res.data.error) {
                      //  console.log("PRODUCTS WERE NOT GOT")
                     //   console.log(pagedData)

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED
                        })

                        return
                    }

                //    console.log("PRODUCTS WERE GOT")
               //     console.log(pagedData)

                    const products = pagedData.data

                    // 1. Form image main photo image models
                    products.map((product, index, array) => {

                        product.state = LOAD_STATES.READY

                        checkProductConsistentAction(product)

                        if (!product.productMainPhotoId || product.productMainPhotoId == 0) {
                            const imageModel = formProductImageModel(product, null)
                            product.mainPhotoImageModel = imageModel

                            return product
                        }

                        const imageModel = formProductImageModel(product, product.productMainPhoto)
                        product.mainPhotoImageModel = imageModel
                        
                        dispatch(downloadImageAction(imageModel))

                        return product
                    })


                    // 2. Send download image request

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS,
                        payload: pagedData
                    })
                }
            )
            .catch(
                err => {
                    console.log("PRODUCTS WERE NOT GOT")
                    console.log(err)

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAILED
                    })
                }
            )
    }

}

export const resetProductFiltersAction = () => {
    return dispatch => {
        dispatch({
            type: PRODUCT_ACTION_TYPES.RESET_PRODUCTS_FILTER
        })
    }
}

export const getProductAction = (productId) => {
    return dispatch => {

        dispatch({
            type: PRODUCT_ACTION_TYPES.GET_PRODUCT
        })

        dispatch(resetCommentReducerAction())

        crudApi().getProduct(productId)
            .then(
                res => {

                    console.log(res)

                    if (res.data.error) {

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.GET_PRODUCT_FAILED,
                            payload: {}
                        })

                        return
                    }

                    const product = res.data

                    dispatch(checkProductConsistentAction(product))

                    // main photo

                    if (!product.productMainPhoto || product.productMainPhotoId == 0) {
                        const imageModel = formProductImageModel(product, null)
                        product.mainPhotoImageModel = imageModel
                        
                    } else {
                        const imageModel = formProductImageModel(product, product.productMainPhoto)
                        product.mainPhotoImageModel = imageModel

                        dispatch(downloadImageAction(imageModel))
                    }

                    

                    // other photos
                    product.imageModels = []
                    product.productPhotos.map((productPhoto, index, array) => {

                        const imageModel = formProductImageModel(product, productPhoto)

                        if (productPhoto.id == product.productMainPhotoId) {
                            imageModel.isMain = true
                        }

                        product.imageModels.push(imageModel)

                        dispatch(downloadImageAction(imageModel))

                        return productPhoto
                    })

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.GET_PRODUCT_SUCCESS,
                        payload: product
                    })

                }
            )
            .catch(
                err => {
                    console.log(err)

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.GET_PRODUCT_FAILED
                    })
                }
            )
    }
}

const checkProductConsistentAction = (product) => {
    return dispatch => {

        const state = store.getState()

        const categoriesMap = state.categoriesReducer.content
        const manufacturersMap = state.manufacturerReducer.content

        const characteristicsMap = state.characteristicReducer.content
        const characteristicValuesMap =  state.characteristicReducer.charValuesContent

        if (state.categoriesReducer.state === LOAD_STATES.READY) {
            if (!categoriesMap.has(product.categoryId)) {
                dispatch(getCategoryAction(product.categoryId))
            }
        }
        
        if (state.manufacturerReducer.state === LOAD_STATES.READY) {
            if (!manufacturersMap.has(product.manufacturerId)) {
                dispatch(getManufacturerAction(product.manufacturerId))
            }  
        }
         
        if (state.characteristicReducer.state === LOAD_STATES.READY) {
            product.n_N_Product_Characteristics.map((nn, index, array) => {
                const characteristicValue = nn.characteristicValue
    
                if (characteristicsMap.has(characteristicValue.characteristicId)) {
                    if (!characteristicValuesMap.has(characteristicValue.id)) {
                        dispatch( insertCharacteristicValue( characteristicValue ) )
                    } else {
                        // everything is ok!!!
                    }
                    
                } else {
                    dispatch( getCharacteristicAction( characteristicValue.characteristicId ) )
                }
    
            })
        }

        

    }
}

const uploadProductPhotosAction = (imageModels, product) => {
    return dispatch => {

        imageModels.map((imageModel, index, array) => {
            const pathModel = new PathModel("products/" + product.id + "/photos", imageModel.file.name) // for downloading only

            imageModel.noImg = no_product
            imageModel.uploadApiFunc = uploadProductPhotoApi
            imageModel.updateReducerConst = PRODUCT_ACTION_TYPES.UPDATE_PRODUCTS_REDUCER_ON_UPLOAD
            imageModel.updateReducerPayload = product
            imageModel.pathModel = pathModel
            imageModel.isAuth = false

            imageModel.optionalData = {
                productId: product.id,
                isMain: imageModel.isMain
            }
            
            dispatch(uploadImageAction(imageModel, imageModel.file))
            
        })
    }
}

const formProductImageModel = (product, productPhoto) => {
    const imageModel = new ImageModel()
    const pathModel = productPhoto ?  ( new PathModel("products/" + product.id + "/photo" + productPhoto.id, productPhoto.fileName) ) : null // for downloading only

    imageModel.noImg = no_product
    imageModel.noImgWidth = no_productWidth
    imageModel.noImgHeight = no_productHeight

    imageModel.updateReducerConst = PRODUCT_ACTION_TYPES.UPDATE_PRODUCTS_REDUCER_ON_DOWNLOAD
    imageModel.updateReducerPayload = product
    imageModel.pathModel = pathModel
    imageModel.isAuth = false

    imageModel.productPhoto = productPhoto


    return imageModel
}

export const removeProductAction = (product) => {

    return dispatch => {
        
        dispatch( {
            type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT,
            payload: product
        })

        crudApi().removeProduct( { id: product.id } )
            .then(
                res => {
                    if (res.data.error) {

                        dispatch( {
                            type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED,
                            payload: product
                        })

                        dispatch(
                            showAlertPopupXAction(
                                { width: 200, height: 100},
                                (
                                    <div>
                                        Не удалось удалить продукт { res.data.error }
                                    </div>
                                )
                            )
                        )
                        return
                    }


                    dispatch({
                        type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_SUCCESS,
                        payload: product
                    })

                    dispatch(getProductsAction())

                    dispatch(
                        showAlertPopupXAction(
                            { width: 200, height: 100},
                            (
                                <div>
                                    Продукт успешно удален
                                </div>
                            )
                        )
                    )

                }
            )
            .catch(
                err => {

                    dispatch( {
                        type: PRODUCT_ACTION_TYPES.REMOVE_PRODUCT_FAILED,
                        payload: product
                    })

                    
                    dispatch(
                        showAlertPopupXAction(
                            { width: 200, height: 100},
                            (
                                <div>
                                    Не удалось удалить продукт
                                </div>
                            )
                        )
                    )

                }
            )

    }

}


export const likeProductAction = (product) => {
    return dispatch => {
        dispatch({
            type: PRODUCT_ACTION_TYPES.LIKE_PRODUCT,
            payload: product
        })

        const prdct = {
            id: product.id
        }

        crudApi().likeProduct(prdct)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.LIKE_PRODUCT_FAILED,
                            payload: product
                        })

                        return
                    }


                    const productLike = res.data

                //    console.log(product.productLike)
                    product.lastProductLike = product.productLike
                    product.productLike = productLike

                    console.log(productLike)


                    dispatch({
                        type: PRODUCT_ACTION_TYPES.LIKE_PRODUCT_SUCCESS,
                        payload: product
                    })
                }
            )
            .catch(
                err => {

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.LIKE_PRODUCT_FAILED,
                        payload: product
                    })

                }
            )
    }
}

export const dislikeProductAction = (product) => {
    return dispatch => {
        dispatch({
            type: PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT,
            payload: product
        })

        const prdct = {
            id: product.id
        }

        crudApi().dislikeProduct(prdct)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT_FAILED,
                            payload: product
                        })

                        return
                    }

                    const productLike = res.data

                    product.lastProductLike = product.productLike
                    product.productLike = productLike

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT_SUCCESS,
                        payload: product
                    })
                }
            )
            .catch(
                err => {

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.DISLIKE_PRODUCT_FAILED,
                        payload: product
                    })

                }
            )
    }
}

export const takeReactionBackAction = (product) => {
    return dispatch => {
        dispatch({
            type: PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK,
            payload: product
        })

        const prdct = {
            id: product.id
        }

        crudApi().takeReactionBack(prdct)
            .then(
                res => {

                    if (res.data.error) {

                        dispatch({
                            type: PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK_FAILED,
                            payload: product
                        })

                        return
                    }

                    product.lastProductLike = product.productLike

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK_SUCCESS,
                        payload: product
                    })
                }
            )
            .catch(
                err => {

                    dispatch({
                        type: PRODUCT_ACTION_TYPES.TAKE_REACTION_BACK_FAILED,
                        payload: product
                    })

                }
            )
    }
}


