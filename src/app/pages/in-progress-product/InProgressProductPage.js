import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"


import LoadingComponent from "../../common/components/loading-component/LoadingComponent"
import ManufacturerItemComponent from "../../common/specific-components/manufacturers/ManufacturerItemComponent"
import ProductImageComponent from "../../common/specific-components/products/paged-representation/ProductImageComponent"

import { showAlertPopupXAction } from "../../common/actions/popup-actions"

import { ROUTES, SUBROUTES } from "../../../core/routes"
import { LOAD_STATES } from "../../../core/load-states"

import CharacteristicsTabComponent from "../product/components/product-tabs/characteristics-tab/CharacteristicsTabComponent"
import ProductPhotoSliderComponent from "../product/components/photo-slider/ProductPhotoSliderComponent"

import "./styles/product-styles.css"

var qs = require('qs');

// productId
class InProgressProductPage extends LoadingComponent {


    
    onFailed() {
        return (
            <>
                <div>Error while updating product</div>
            </>
        )
    }


    onNone() {
        return <span>No product</span>
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const product = prevProps.product

        if (this.props.state === LOAD_STATES.NONE) {
            if (product) {

                const productFilter = { categoryId: product.categoryId }
                const productFilterStr = qs.stringify(productFilter)

                this.props.history.push({
                    pathname: generatePath(
                        ROUTES.CONSOLE + SUBROUTES.CONSOLE.PRODUCTS + "/:productFilter?/:paginationFilter?",  
                        {
                            productFilter: productFilterStr
                        } 
                    )
                })

                this.props.showAlertPopupX({width: 300, height:100}, (<div><label>Продукт успешно обновлен!</label></div>))
            } else {
                this.props.history.push({
                    pathname: generatePath(
                        ROUTES.CONSOLE + SUBROUTES.CONSOLE.PRODUCTS + "/:productFilter?/:paginationFilter?",  
                        {
                            
                        } 
                    )
                })
            }
        }
    }

    renderContent() {

        const product = this.props.product
        
        //console.log(product)

        return (
            <div className = "product-page">

                <div>{ product.name }</div>
                <div>{ product.price }</div>
                <div>{ product.description }</div>
                

                <ManufacturerItemComponent
                    manufacturerId = { product.manufacturerId }
                />

                <div
                    style = {
                        {
                            height: "150px",
                            width: "100px"
                        }
                    }
                >
                    <ProductImageComponent        
                        imageModel = { product.mainPhotoImageModel }
                        state = { product.mainPhotoImageModel.state }
                    />
                </div>
                
                <div
                    onClick = {
                        (e) => {
                            this.props.showAlertPopupX(
                                { width: 90, height:90, inPercents: true },
                                <ProductPhotoSliderComponent

                                    data = { product.imageModels }

                                    selectable = { false }
                                    tilesNumber = "1"
                                    centered = { true }

                                    style = {
                                        {
                                            height: "100%",
                                            width: "100%"
                                        }
                                    }

                                />
                            )
                        }
                    }
                
                >Full screen photo view</div>

                <ProductPhotoSliderComponent

                    data = { product.imageModels }

                    selectable = { false }
                    tilesNumber = "2"
                    centered = { true }

                    style = {
                        {
                            height: "20%",
                            width: "50%"
                        }
                    }

                />

                <CharacteristicsTabComponent productId = { product.id } />

            </div>
        )
    }


  
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showAlertPopupX: showAlertPopupXAction
        },
        dispatch
    )
}

function mapStateToProps(state, props) {

    const product = state.productsReducer.inProgressContent.get(parseInt(props.match.params.productId))

    return {
        productsReducer: state.productsReducer,
        
        categoriesReducer: state.categoriesReducer,
        manufacturerReducer: state.manufacturerReducer,
        characteristicReducer : state.characteristicReducer,

        commentsReducer: state.commentsReducer,
        count: state.commentsReducer.content.size,

        state: product ? product.state : LOAD_STATES.NONE,
        product: product,
    }
}  

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(InProgressProductPage))