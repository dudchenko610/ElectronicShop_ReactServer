import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {LOAD_STATES} from "../../../../../core/load-states"

import ListComponent from "../../../components/list-wrapper/ListComponent"

import ProductsGridComponent from "./grid/ProductsGridComponent"
import ProductsListComponent from "./list/ProductsListComponent"

import ProductSortingComponent from "./ProductSortingComponent"


//import "./styles/product-paged-styles.css"

class ProductsInProgressComponent extends ListComponent {

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
                        onChangeViewMode = {
                            (mode) => {
                                this.setState({isInGridMode: mode})
                            }
                        }
                    />
                )
            case 1:

                const products = []

                this.props.productsReducer.inProgressContent.forEach((value, index) => {
                    products.push(value)
                })

            //    console.log(products)

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

            default:
                return null
        }
    }

    onNone() {
        return <label>There no in-progress products</label>
    }



}

function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer,
        state: LOAD_STATES.READY,


        data: [ {attr: "sorting"},  {attr: "products"} ],
        
    }
}

export default connect(mapStateToProps)(withRouter(ProductsInProgressComponent))
