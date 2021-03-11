import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {LOAD_STATES} from "../../../core/load-states"

import FilterComponent from "../../common/specific-components/products/filtering/FilterComponent"
import ProductsPagedComponent from "../../common/specific-components/products/paged-representation/ProductsPagedComponent"

import {getProductsAction} from "../../common/crud/products/actions/product-actions"

import "./styles/search-styles.css"
// categoryId

var qs = require('qs');

class SearchPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            isLoaded: false
        }
    }

    render ()  { 

        if (this.props.categoriesReducer.state !== LOAD_STATES.READY) {
            return <></>
        }

        const productFilter = qs.parse(this.props.match.params.productFilter)
        const paginationFilter = qs.parse(this.props.match.params.paginationFilter)

        const categoryId = parseInt(productFilter.categoryId)

        if ( !productFilter || !productFilter.categoryId || !this.props.categoriesReducer.content.has(categoryId) ) {
            this.props.history.push("/home")
            return <span></span>
        }

        this.props.getProducts(paginationFilter, productFilter)
        if (!this.state.isLoaded) {
            
            this.state.isLoaded = true
        }

        return (
            <div className = "search-tab">

                <div className = "search-product-filter-container">
                    <FilterComponent
                        categoryId = { categoryId }
                    />
                </div>
                
                <div className = "paged-products-container">
                    <ProductsPagedComponent/>
                </div>

                
            </div>
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
        categoriesReducer: state.categoriesReducer
    }
}  

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(SearchPage))