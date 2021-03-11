import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import ManufacturerItemComponent from "../../../manufacturers/ManufacturerItemComponent"
import ProductImageComponent from "../../paged-representation/ProductImageComponent"


import LoadingComponent from "../../../../components/loading-component/LoadingComponent"
import { ROUTES } from "../../../../../../core/routes"

import "./styles/product-item-styles.css"

class ProductGridItemComponent extends LoadingComponent {


    renderContent() {

        const product = this.props.product

        return (
            <div className = "product-item-grid">



                <Link className='product-name' to = { ROUTES.IN_PROGRESS_PRODUCT + "/" + product.id }>
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



function mapStateToProps(state, props) {

    return {
        productsReducer : state.productsReducer
    }
}


export default connect(mapStateToProps)(ProductGridItemComponent)

