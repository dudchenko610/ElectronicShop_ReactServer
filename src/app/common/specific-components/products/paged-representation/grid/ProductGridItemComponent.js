import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import ManufacturerItemComponent from "../../../manufacturers/ManufacturerItemComponent"

import ProductImageComponent from "../ProductImageComponent"

import "./styles/product-item-styles.css"
import LoadingComponent from "../../../../components/loading-component/LoadingComponent"
import { store } from "../../../../../.."
import { removeProductAction } from "../../../../crud/products/actions/product-actions"
import { ROUTES } from "../../../../../../core/routes"

class ProductGridItemComponent extends LoadingComponent {

    constructor(props) {
        super(props)
    }


    renderContent() {

        const product = this.props.product

        const state = store.getState()
        const isAdmin = state.meuserReducer.isAdmin

       // console.log(product.mainPhotoImageModel)

       /** */

        return (
            <div className = "product-item-grid">

                {
                    isAdmin 
                    ?

                        <>
                            <Link className='product-upd' to={ ROUTES.EDIT_PRODUCT + "/" + product.id }>
                                <div>Update</div>
                            </Link>

                            <div
                                onClick = {
                                    (e) => {
                                        this.props.removeProduct(product)
                                    }
                                }
                            >Remove</div> 
                        </>

                         
                    :
                        null
                }

                <Link className='product-name' to={ ROUTES.PRODUCT + "/" + product.id }>
                    <div>Name: { product.name }</div>
                </Link>

                <div>
                    Price: { product.price }
                </div>

                <ManufacturerItemComponent
                    manufacturerId = { product.manufacturerId }
                />

                <ProductImageComponent        
                    imageModel = { product.mainPhotoImageModel }
                    state = { product.mainPhotoImageModel.state }
                />

                <div
                    style = {
                        {
                            width: "100%",
                            height: "50%",
                            
                            border : "1px solid blue"
                        }
                    }
                >

                </div>

                                    
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeProduct: removeProductAction
        },
        dispatch
    )
}

function mapStateToProps(state, props) {

    return {
        productsReducer : state.productsReducer,

        product: state.productsReducer.content.get(props.productId),
        state: state.productsReducer.content.get(props.productId).state
    }
}


export default connect(mapStateToProps, matchDispatchToProps)(ProductGridItemComponent)

