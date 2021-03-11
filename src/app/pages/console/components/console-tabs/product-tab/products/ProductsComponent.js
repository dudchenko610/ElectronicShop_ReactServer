import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import { LOAD_STATES } from "../../../../../../../core/load-states"
import { ROUTES, SUBROUTES } from "../../../../../../../core/routes"

import ProgressBar from "../../../../../../common/components/ProgressBar"
import ProductsPagedComponent from "../../../../../../common/specific-components/products/paged-representation/ProductsPagedComponent"
import ProductsInProgressComponent from "../../../../../../common/specific-components/products/in-progress/ProductsInProgressComponent"


import {showAlertPopupAction} from "../../../../../../common/actions/popup-actions"
import {switchToUploadingProductsAction, switchToDefaultProductsAction} from "../../../../actions/console-actions"
import {resetProductFiltersAction, getProductsAction} from "../../../../../../common/crud/products/actions/product-actions"
import { pickCategoryAction } from "../../../../actions/console-actions"

import { addPopStateListener, removePopStateListener } from "../../../../../../../core/pop-history-events"

import "./styles/product-styles.css"

const qs = require('qs')

class ProductsComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            lastPath: ""
        }

        this.popHistoryCallback = () => {
            if (this.props.match.url.includes(SUBROUTES.CONSOLE.PRODUCTS)) {
                this.adjustDataWithPath()
            }
        }
    }

    adjustDataWithPath() {
        const paginationFilter = qs.parse(this.props.match.params.paginationFilter)
        const productFilter = qs.parse(this.props.match.params.productFilter)

        const categoryId = parseInt(productFilter.categoryId)

        if ( this.props.categoriesReducer.content.has(categoryId) ) {

            const category = this.props.categoriesReducer.content.get(categoryId)
            this.props.pickCategory(category)

            this.props.getProducts(paginationFilter, productFilter)

        } else {
            this.props.pickCategory(null)
            this.props.resetProductFilters()
        }
    }

    componentDidMount() {
        addPopStateListener(this.popHistoryCallback)

        console.log("componentDidMount")
        this.adjustDataWithPath()
    }

    componentWillUnmount() {
        removePopStateListener(this.popHistoryCallback)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.productsReducer.addingNewState === LOAD_STATES.NONE && !this.props.consoleReducer.defaultProductList) {
            this.props.getProducts()
            this.props.switchToDefaultProducts()
        }

        if ( this.props.match.path !== prevProps.match.path ) {

            if ( this.props.match.path.includes(SUBROUTES.CONSOLE.PRODUCTS) ) {
               // this.adjustDataWithPath()
            }
            return 
        } 

        if (prevProps.categoriesReducer.state !== LOAD_STATES.READY && this.props.categoriesReducer.state === LOAD_STATES.READY) {
            this.adjustDataWithPath()
        }

        
    }

    render() {

        if (this.props.categoriesReducer.state !== LOAD_STATES.READY) {
            return <div className = "products-container"></div>
        }

        return (
            <div className = "products-container">

                <div className="add-product-btn-container">

                    {
                        this.props.consoleReducer.currentCategory ?
                        
                        <>
                             <Link className='add-product-a' to = { ROUTES.ADD_PRODUCT + "/" + this.props.consoleReducer.currentCategory.id + "/30"}>
                                <span>Add Product</span>
                            </Link>
                        </>

                        :

                        <span></span>
                    }

                    
                        
                    {

                        this.props.productsReducer.addingNewState != LOAD_STATES.NONE ?

                        <div>
                            <ProgressBar sqSize= "16" phase = {Math.random() * 100} strokeWidth = "1"/> 

                            {
                                this.props.consoleReducer.defaultProductList ?
                                    <a
                                        onClick = {
                                            (e) => {
                                                this.props.switchToUploadingProducts()
                                            }
                                        }

                                    >Uploading Products List</a>
                                :
                                    <a
                                        onClick = {
                                            (e) => {
                                                this.props.switchToDefaultProducts()
                                            }
                                        }
                                    >Default Products List</a>
                            }

                            
                        </div>

                        :

                        <span></span>
                    }
                        
                </div>

                {
                    this.props.consoleReducer.defaultProductList ?
                        <ProductsPagedComponent />
                    :
                        <ProductsInProgressComponent />
                }

            </div>
        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showAlertPopup: showAlertPopupAction,
            switchToUploadingProducts: switchToUploadingProductsAction,
            switchToDefaultProducts: switchToDefaultProductsAction,

            pickCategory: pickCategoryAction,

            resetProductFilters: resetProductFiltersAction,
            getProducts: getProductsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {



    return {
        consoleReducer: state.consoleReducer,
        categoriesReducer: state.categoriesReducer,
        productsReducer: state.productsReducer,
        
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProductsComponent))

