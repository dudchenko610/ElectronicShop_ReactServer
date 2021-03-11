import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"
import { Link } from "react-router-dom"

import { LOAD_STATES } from "../../../core/load-states"

import { addProductAction, getProductAction, resetProductFiltersAction } from "../../common/crud/products/actions/product-actions"

import AdminPage from "../../common/components/AdminPage"

import UploadImageSliderComponent from "../../common/specific-components/sliders/upload-image-slider/UploadImageSliderComponent"
import ManufactSelectComponent from "../../common/specific-components/selects/manufact-select/ManufactSelectComponent"
import CharValueSliderComponent from "../../common/specific-components/sliders/char-value-select-slider/CharValueSliderComponent"
import TypeProductDataComponent from "../../common/specific-components/products/edit/TypeProductDataComponent"


import "./styles/add-product-styles.css"
import { ROUTES, SUBROUTES } from "../../../core/routes"

var qs = require('qs');

class AddProductPage extends AdminPage {
    
    constructor(props) {
        super(props)

        this.state = {
            product : {
                name: "",
                price: 0,
                descriptionFull : "",
                descriptionShort : "",
    
                manufacturerId : -1,
                categoryId : -1,
    
            },

            imageModels : [],
            charValuesMap : new Map()

        }
    }

    renderContent() {

        // checking

        if (this.props.categoriesReducer.state !== LOAD_STATES.READY/* || this.props.characteristicReducer.state !== LOAD_STATES.READY */ ) {
            return <></>
        }

        const categoryId = parseInt(this.props.match.params.categoryId)
        const category = this.props.categoriesReducer.content.get(categoryId)

        if (!category) {
            this.props.history.push("/console")
            return <></>
        }

        this.state.product.categoryId = categoryId

        return (
            <div className = "add-product-container">

                <TypeProductDataComponent
                    editable = {
                        {
                            name: "",
                            price: "",
                            description: "",
                            count: ""
                        }
                    }
                    onEdit = {
                        (editable) => {

                            this.state.product = {
                                ...this.state.product,
                                ...editable,
                                price : parseInt(editable.price)
                            }
                        }
                    }
                />

                <ManufactSelectComponent
                    defaultValue = "Pick a manufacturer"
                    onSelected = {
                        (manufactId) => {
                            //console.log("manufactId = " + manufactId)
                            this.state.product.manufacturerId = manufactId
                        }
                    }
                />
                

                <UploadImageSliderComponent

                    selectable = { true }
                    tilesNumber = "4"
                    centered = { true }

                    style = {
                        {
                            height: "20%",
                            width: "50%"
                        }
                    }

                    onImageChoose = {
                        (imageModels, data) => {
                            this.state.imageModels = imageModels
                        }
                    }
                />

                <CharValueSliderComponent

                    tilesNumber = "2"

                    style = {
                        {
                            height: "20%",
                            width: "40%"
                        }
                    }

                    categoryId = {this.props.match.params.categoryId}

                    onCharValuesSelected = {
                        (charValuesMap) => {
                            this.state.charValuesMap = charValuesMap
                        }
                    }
                />


                <div
                    onClick = {
                        () => {
                            this.props.addProduct(this.state.product, this.state.imageModels, this.state.charValuesMap)

                        /*    let pagFltr = null
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
                            })*/
             
                            const productFilterStr = qs.stringify( { categoryId: categoryId } )
    
                            this.props.history.push({
                                pathname: generatePath(
                                    ROUTES.CONSOLE + SUBROUTES.CONSOLE.PRODUCTS + "/:productFilter?/:paginationFilter?",  
                                    {
                                        productFilter: productFilterStr
                                    } 


                                )
                            })
                        }
                    }

                >Add Product</div>

              

            </div>
        )
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addProduct : addProductAction,

            resetProductFilters: resetProductFiltersAction,
            getProducts: getProductAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        categoriesReducer : state.categoriesReducer,
        meuserReducer: state.meuserReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(AddProductPage))