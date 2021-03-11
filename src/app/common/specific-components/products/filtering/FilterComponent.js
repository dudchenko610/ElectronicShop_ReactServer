import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"

import ReloadableComponent from "../../../components/loading-component/ReloadableComponent"
import RangeSliderWithInputsComponent from "../../../../common/components/range-sliders/range-slider-with-inputs-component/RangeSliderWithInputsComponent"
import CharValueListPicker from "./CharValueListPicker"

import {getProductsAction} from "../../../crud/products/actions/product-actions"

import "./styles/filter-styles.css"

var qs = require('qs');

// categoryId
class FilterComponent extends ReloadableComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

            filtrationModel: {
                categoryId : null,
                minPrice : 0,
                maxPrice: 99999999,

                manufacturerIds: [],
                characteristicValuesIds: []
            }
        }
    }

    onUpdate() {

        this.setNone()

        if (!this.props.categoryId) {
            if (this.props.consoleReducer.currentCategory) {

                this.state.category = this.props.consoleReducer.currentCategory
                this.state.filtrationModel.categoryId = this.state.category.id
                this.setReady()
            }

        } else {
            const categoryId = this.props.categoryId
            const category = this.props.categoriesReducer.content.get(categoryId)

            this.state.category = category
            this.state.filtrationModel.categoryId = this.state.category.id
            this.setReady()
        }

       

        
    }

    onNone() {
        return <label>Choose category!</label>
    }

    renderContent () {

        const category = this.state.category
        const categoryId = category.id

       // console.log(this.props.productsReducer.paginationFilter)
       // console.log(this.props.productsReducer.productFilter)

        let manufacturersChecked = []
        let characteristicsChecked = []

        if (this.props.productsReducer.productFilter) {
            manufacturersChecked = this.props.productsReducer.productFilter.manufacturerIds
        }

        if (this.props.productsReducer.productFilter) {
            characteristicsChecked = this.props.productsReducer.productFilter.characteristicValuesIds
        }

        /*   */
        return (
            <div className = "search-filter-component">

                {
                    this.props.categoryId ?
                        <label>{category.name}</label>
                    :
                    ""
                }

                <RangeSliderWithInputsComponent
                    style = {{
                        height : "80px"
                    }}

                    min = "0"
                    max = "10000"

                    onValuesChanged = {
                        (left, right) => {
                            this.state.filtrationModel.minPrice = parseInt(left)
                            this.state.filtrationModel.maxPrice = parseInt(right)

                      //      console.log(left + " " + right)
                        }
                    }
                />

                <CharValueListPicker
                    categoryId = { categoryId }

                    manufacturersIdsChecked = { manufacturersChecked }
                    charValIdsChecked = { characteristicsChecked }

                    onCheckChanged = {
                        (manufacturers, charValues) => {
                            
                            this.state.filtrationModel.manufacturerIds = manufacturers
                            this.state.filtrationModel.characteristicValuesIds = charValues
                                       
                        }
                    }
                />  

                <a
                    onClick = {
                        (event) => {
                            console.log("Search")

                            let pagFltr = null
                            if (this.props.productsReducer.paginationFilter) {
                                pagFltr = {
                                    pageNumber: this.props.productsReducer.paginationFilter.pageNumber
                                }
                            }

                            let pagFiltrSerialized = qs.stringify(pagFltr)
                            let prodctFiltrSerialized = qs.stringify(this.state.filtrationModel)

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

                            this.props.getProducts(this.props.productsReducer.paginationFilter, this.state.filtrationModel)



                        }
                    }
                >Search</a>


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
        categoriesReducer: state.categoriesReducer,
        consoleReducer: state.consoleReducer,
        productsReducer : state.productsReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(FilterComponent))
