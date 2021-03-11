import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import ManufacturerItemComponent from "../../../manufacturers/ManufacturerItemComponent"
import ProductImageComponent from "../../paged-representation/ProductImageComponent"

import LoadingComponent from "../../../../components/loading-component/LoadingComponent"
import { ROUTES } from "../../../../../../core/routes"

import "./styles/product-item-styles.css"

class ProductListItemComponent extends LoadingComponent {

    renderContent() {

        const product = this.props.product


        return (
            <div className = "product-item-list">

                <div className = "product-item-image-wrapper">

                    <ProductImageComponent        
                        imageModel = { product.mainPhotoImageModel }
                        state = { product.mainPhotoImageModel.state }

                    />

                </div>

                <div className = "product-item-data-wrapper">

                    

                    <Link className = 'product-name' to = { ROUTES.IN_PROGRESS_PRODUCT + "/" + product.id }>
                        <span>Name: { product.name }</span>
                    </Link>

                    <div>
                        Price: { product.price }
                    </div>

                    <ManufacturerItemComponent
                        manufacturerId = { product.manufacturerId }
                    />
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


export default connect(mapStateToProps)(ProductListItemComponent)

