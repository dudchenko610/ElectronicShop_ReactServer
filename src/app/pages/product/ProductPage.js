import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import LoadingComponent from "../../common/components/loading-component/LoadingComponent"
import ManufacturerItemComponent from "../../common/specific-components/manufacturers/ManufacturerItemComponent"
import ProductPhotoSliderComponent from "./components/photo-slider/ProductPhotoSliderComponent"
import ProductImageComponent from "../../common/specific-components/products/paged-representation/ProductImageComponent"
import ProductTabsComponent from "./components/ProductTabsComponent"

import { getProductAction } from "../../common/crud/products/actions/product-actions"

import { LOAD_STATES } from "../../../core/load-states"


import "./styles/product-styles.css"
import ListComponent from "../../common/components/list-wrapper/ListComponent"
import { getCommentsAction } from "../../common/crud/comments/actions/comment-actions"
import ProductLikeComponent from "../../common/specific-components/products/item/ProductLikeComponent"
import { hidePopupAction, showAlertPopupXAction } from "../../common/actions/popup-actions"
import BuyProductComponent from "../../common/specific-components/order/BuyProductComponent"

// productId
class ProductPage extends ListComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            isLoaded: false,

            curTabIndex: 0
        }
    }

    onScroll(event) {

        const wrapperPbHeight = 35

        if (this.state.curTabIndex == 1) {

            const maxScrollY = (event.target.scrollHeight - event.target.clientHeight)
    //    console.log("maxScrollY = " + maxScrollY)

        //    console.log("SCROLL BOTTOM = " + (maxScrollY - event.target.scrollTop))

            if ((maxScrollY - event.target.scrollTop) < wrapperPbHeight) {
            //    console.log("SCROLLLLLLLLLLLLLLLLLLLLLL")

                this.getCommentsData()
            }

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

            setTimeout(() => {
                
                let scrollbarHeight = 0
                if (this.scrollViewRef.current) {
                    scrollbarHeight = this.scrollViewRef.current.scrollHeight
                }
    
                let innerListHeight = 0
                if (this.innerListRef.current) {
                    innerListHeight = this.innerListRef.current.clientHeight
                }
                
             //   console.log("scrollbarHeight = " + scrollbarHeight)
            //    console.log("innerListHeight = " + innerListHeight)
            //    console.log("count = " + this.props.count)
    
    
    
                if (innerListHeight < scrollbarHeight) {
            
                    if (this.props.commentsReducer.gettingCommentsState === LOAD_STATES.READY && this.props.commentsReducer.hasMore ) {
    
                        if (this.state.curTabIndex == 1) {
    
                       //     console.log("UPDATEEEEEEEEE")
    
                            this.getCommentsData()
                        }
                        
                    }
                }


            }, 800)

           


            
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

    onReadyElement(element, index, array) {
        const product = this.props.product
        
        //console.log(product)

        const isAdmin = this.props.meuserReducer.isAdmin


        return (
            <div key = "0" className = "product-page">

                <div
                    onClick = {
                        (event) => {
                            const productId = parseInt(this.props.match.params.productId)
                            this.props.getProduct(productId)
                        }
                    }

                >Repeat</div>

                <div>{ product.name }</div>
                <div>{ product.price }</div>
                <div>{ product.description }</div>
                <div>{ product.count }</div>


                {
                    !isAdmin ?
                        <div
                            onClick = {
                                (e) => {

                                    const jsx = (
                                        <BuyProductComponent 
                                                product = { product }
                                                onOk = {
                                                    () => {
                                                        this.props.hidePopup(jsx)
                                                    }
                                                }
                                        />
                                    )

                                    // popup
                                    this.props.showAlertPopupX( { width: 300, height: 150 }, jsx )
                                }
                            }
                        >Buy</div>
                    :
                        null
                }

                

                <ProductLikeComponent
                    state = { product.productLike ? product.productLike.state : LOAD_STATES.READY }
                    product = { product }
                />

                

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

                <ProductTabsComponent
                    productId = { product.id }
                    onTabClicked = {
                        (index) => {
                            this.setState(  { curTabIndex: index } )
                        }
                    }
                />



            </div>
        )
    }

    getCommentsData() {

        if (this.props.commentsReducer.content.size == 0) {
            return
        }

        if (!this.props.commentsReducer.hasMore) {
            return
        }

        const values = Array.from( this.props.commentsReducer.content.values() )
        const lastCommentId = values[values.length - 1].id
        
        //console.log(values)
   //     console.log("lastCommentId = " + lastCommentId)

        const productId = parseInt(this.props.match.params.productId)
        this.props.getComments(productId, lastCommentId)
    }

  
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getProduct: getProductAction,
            getComments: getCommentsAction,

            showAlertPopupX: showAlertPopupXAction,
            hidePopup: hidePopupAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer,
        productsReducer: state.productsReducer,
        
        categoriesReducer: state.categoriesReducer,
        manufacturerReducer: state.manufacturerReducer,
        characteristicReducer : state.characteristicReducer,

        commentsReducer: state.commentsReducer,
        count: state.commentsReducer.content.size,

        state: state.productsReducer.stateCurrent,
        product: state.productsReducer.currentProduct,
        data: [{}]
    }
}  

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProductPage))