import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"

import {LOAD_STATES} from "../../../../../core/load-states"

import ListComponent from "../../../components/list-wrapper/ListComponent"

import ProductsGridComponent from "./grid/ProductsGridComponent"
import ProductsListComponent from "./list/ProductsListComponent"

import PageSwitchSliderComponent from "../../sliders/page-switch-slider/PageSwitchSliderComponent"
import ProductSortingComponent from "./ProductSortingComponent"

import { getProductsAction } from "../../../crud/products/actions/product-actions"

//import "./styles/product-paged-styles.css"

var qs = require('qs');

class ProductsPagedComponent extends ListComponent {

    constructor(props){
        super(props)

        this.state = {
            ...this.state,
            isInGridMode: true
        }

    }

    onReadyElement(element, index, array) {

        
        
        switch(index) {
            case 0:
                return (
                    <ProductSortingComponent
                        key = { index }
                        isInGridMode = { this.state.isInGridMode }
                        editable = {
                            {
                                nameFilter: ""
                            }
                        }
                        onChangeViewMode = {
                            (mode) => {
                                this.setState({isInGridMode: mode})
                            }
                        }
                    />
                )
            case 1:

                const products = []
                this.props.productsReducer.content.forEach((value, index) => {
                    products.push(value)
                })

                if (this.state.isInGridMode) {
                    return (
                        <ProductsGridComponent
                            data = { products }
                            state = { LOAD_STATES.READY }
                            key = { index }
                        />
                    )
                } else {
                    return (
                        <ProductsListComponent
                            data = { products }
                            state = { LOAD_STATES.READY }
                            key = { index }
                        />
                    )
                }
                
            case 2:
                
                if (!this.props.productsReducer.paginationFilter || this.props.productsReducer.paginationFilter.totalPages < 2) {
                    return <div key = { index } ></div>
                }

                return (
                    <div 
                        className = "center-notification-pb-txt" 
                        style = {{ width: "100%", height: "auto"}}
                        key = { index }
                    >
                        <div style = {{ width: "50%"}}>
                            <PageSwitchSliderComponent
                                currentNumber = { this.props.productsReducer.paginationFilter.pageNumber }
                                pageCount = { this.props.productsReducer.paginationFilter.totalPages }
                                

                                onPageChoosen = {
                                    (pageNumber) => {
                                     //   console.log("pageNumber = " + pageNumber)

                                        const paginationFilter = {
                                            ...this.props.productsReducer.paginationFilter,
                                            pageNumber: pageNumber
                                        }

                                       // console.log(paginationFilter)
                                       // console.log(this.props.productsReducer.productFilter)

                                     //   this.scrollView.scrollIntoView({ block: "start", inline: "nearest" })
                                        this.props.getProducts(paginationFilter, this.props.productsReducer.productFilter)

                                        let pagFltr = null
                                        if (this.props.productsReducer.paginationFilter) {
                                            pagFltr = {
                                                pageNumber: this.props.productsReducer.paginationFilter.pageNumber
                                            }
                                        }

                                        let pagFiltrSerialized = qs.stringify(pagFltr)
                                        let prodctFiltrSerialized = qs.stringify(this.props.productsReducer.productFilter)

                                        if (!pagFiltrSerialized) {
                                            pagFiltrSerialized = "null"
                                        }

                                        if (!prodctFiltrSerialized) {
                                            prodctFiltrSerialized = "null"
                                        } 


                                        this.props.history.push({
                                            pathname: generatePath(this.props.match.path, 
                                                { 
                                                    paginationFilter: pagFiltrSerialized, 
                                                    productFilter: prodctFiltrSerialized 
                                                } 
                                            )
                                        })

                                    }
                                }

                            />
                        </div>
                    </div>
                    
                )
            default:
                return null
        }
    }

    onNone() {
        return <label>There no products</label>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label>
                <a
                    onClick = {
                        (event) => {
                            this.props.getProducts(this.props.productsReducer.paginationFilter, this.props.productsReducer.productFilter)
                        }
                    } 
                >Repeat</a>
            </>
        )
        
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getProducts: getProductsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer,
        state: state.productsReducer.state,
     //   state: LOAD_STATES.READY,


        data: [ {attr: "sorting"},  {attr: "products"}, {attr: "switcher"}],
        
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProductsPagedComponent))
