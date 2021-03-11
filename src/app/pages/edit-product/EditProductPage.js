import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"
import { Link } from "react-router-dom"

import { LOAD_STATES } from "../../../core/load-states"

import { getProductAction, getProductsAction, updateProductAction } from "../../common/crud/products/actions/product-actions"

import ManufactSelectComponent from "../../common/specific-components/selects/manufact-select/ManufactSelectComponent"
import CharValueSliderComponent from "../../common/specific-components/sliders/char-value-select-slider/CharValueSliderComponent"

import { ROUTES, SUBROUTES } from "../../../core/routes"
import TypeProductDataComponent from "../../common/specific-components/products/edit/TypeProductDataComponent"
import LoadingComponent from "../../common/components/loading-component/LoadingComponent"
import { showAlertPopupXAction } from "../../common/actions/popup-actions"

import ProductPhotoEditSliderComponent from "./components/photo-edit-slider/ProductPhotoEditSliderComponent"
import UploadImageEditSliderComponent from "./components/photo-edit-slider/UploadImageEditSliderComponent"
import { resetCommentReducerAction } from "../../common/crud/comments/actions/comment-actions"

import "./styles/edit-product-styles.css"


var qs = require('qs');


class EditProductPage extends LoadingComponent {
    
    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

          /*  product : {
                name: "",
                price: 0,
                description: "",
    
                manufacturerId : -1,
                categoryId : -1,
    
            },*/

            isLoaded: false,
            isMapped: false,
            imageModels : [],
            charValuesMap : new Map(),

            chooseImageData: [],
            changeMainPhotoFlag: false

        }
    }

    componentDidMount() {
        const productId = parseInt(this.props.match.params.productId)
        this.props.getProduct(productId)
        this.setState({isLoaded: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.categoriesReducer.state === LOAD_STATES.READY &&
            this.props.manufacturerReducer.state === LOAD_STATES.READY &&
            this.props.characteristicReducer.state === LOAD_STATES.READY) {

            if (!this.state.isLoaded) {
                const productId = parseInt(this.props.match.params.productId)
                this.props.getProduct(productId)
                this.setState({isLoaded: true})
    
                return
            }

            
            if (!this.state.isMapped) {
                const product = this.props.product

        //        console.log(product)

                if (product && this.props.state === LOAD_STATES.READY) {
                    this.setState( { product: { ...product }, isMapped: true } )
                }
            }

        }

    }

    onFailed() {
        return (
            <>
                <div>Error</div>
                
                <div
                    onClick = {
                        (event) => {
                            const productId = parseInt(this.props.match.params.productId)
                            this.props.getProduct(productId)
                        }
                    }

                >Repeat</div>

            </>
        )
    }

    onNone() {
        // this.props.history.push("/home")
        return <span>No product</span>
    }

    renderContent() {

        const product = this.props.product

    //    console.log(product)
        return (
            <div className = "edit-product-container">

                <TypeProductDataComponent
                    editable = {
                        {
                            name:        this.state.product ? this.state.product.name        : "",
                            price:       this.state.product ? this.state.product.price       : "",
                            description: this.state.product ? this.state.product.description : "",
                            count:       this.state.product ? this.state.product.count       : ""

                        }
                    }
                    onEdit = {
                        (editable) => {

                          //  console.log(editable)
                            this.state.product = {
                                ...this.state.product,
                                ...editable,
                                price : parseInt(editable.price),
                                count : parseInt(editable.count),
                            }
                        }
                    }
                />

                <ManufactSelectComponent
                    defaultValue = { product.manufacturerId }
                    onSelected = {
                        (manufactId) => {
                            //console.log("manufactId = " + manufactId)
                            this.state.product.manufacturerId = manufactId
                        }
                    }
                />

                <div>Manage old photos</div>

                <ProductPhotoEditSliderComponent

                    changeMainPhotoFlag = { this.state.changeMainPhotoFlag }
                    data = { product.imageModels }

                    selectable = { true }
                    tilesNumber = "3"
                    centered = { true }

                    style = {
                        {
                            height: "30%",
                            width: "70%"
                        }
                    }

                    onSelectTile = {
                        () => {
                            this.state.chooseImageData.map((element, index, array) => {
                                element.isSelected = false
                                element.isMain = false
                            })

                            this.setState( { changeMainPhotoFlag: !this.state.changeMainPhotoFlag } )
                        }
                    }

                />

                <div>Add new photos</div>

                <UploadImageEditSliderComponent

                    changeMainPhotoFlag = { this.state.changeMainPhotoFlag }

                    selectable = { true }
                    tilesNumber = "3"
                    centered = { true }

                    style = {
                        {
                            height: "30%",
                            width: "70%"
                        }
                    }

                    onImageChoose = {
                        (imageModels, data) => {
                            this.state.chooseImageData = data
                            this.state.imageModels = imageModels
                        }
                    }

                    onSelectTile = {
                        () => {

                            product.imageModels.map((imageModel, index, array) => {
                                imageModel.isSelected = false
                                imageModel.isMain = false
                            })

                            this.setState( { changeMainPhotoFlag: !this.state.changeMainPhotoFlag } )
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

                    categoryId = { product.categoryId }
                    product = { product }

                    onCharValuesSelected = {
                        (charValuesMap) => {
                            this.state.charValuesMap = charValuesMap
                        }
                    }
                />


                <div
                    onClick = {
                        () => {
                            this.props.updateProduct(product, this.state.imageModels, this.state.charValuesMap, this.state.product)

                            const productFilter = {
                                categoryId: product.categoryId
                            }

                            const productFilterStr = qs.stringify(productFilter)

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

                >Edit Product</div>
              

            </div>
        )
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getProduct: getProductAction,
            updateProduct: updateProductAction,

            showAlertPopupX: showAlertPopupXAction,

            resetProductFilters: resetCommentReducerAction,
            getProducts: getProductsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {

        productsReducer: state.productsReducer,
        
        categoriesReducer: state.categoriesReducer,
        manufacturerReducer: state.manufacturerReducer,
        characteristicReducer : state.characteristicReducer,

        meuserReducer: state.meuserReducer,

        state: state.productsReducer.stateCurrent,
        product: state.productsReducer.currentProduct
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(EditProductPage))