import React from "react"
import { connect } from "react-redux"


import ImageViewSliderCompoent from "../../../../common/specific-components/sliders/images-view-slider/ImageViewSliderCompoent"
import ProductImageComponent from "../../../../common/specific-components/products/paged-representation/ProductImageComponent"

class ProductPhotoSliderComponent extends ImageViewSliderCompoent {


    onReadyElement(imageModel, index, array) {   

        return (
            <div 
                style = {{
                    height: this.state.height + "px",
                    width: this.state.itemWidth + "px"
                }}
                key = { index }
            >
                <ProductImageComponent
                    imageModel = { imageModel }
                    state = { imageModel.state }
                />
            </div>
            
        )
    }
}


function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps)(ProductPhotoSliderComponent)


