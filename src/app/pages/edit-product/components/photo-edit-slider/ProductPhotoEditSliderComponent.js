import React from "react"
import { connect } from "react-redux"
import { LOAD_STATES } from "../../../../../core/load-states"
import ImageViewSliderComponent from "../../../../common/specific-components/sliders/images-view-slider/ImageViewSliderCompoent"
import ProductImageEditComponent from "./ProductImageEditComponent"

// onSelectTile
class ProductPhotoEditSliderComponent extends ImageViewSliderComponent {


    onReadyElement(imageModel, index, array) {   

        return (
            <div 
                style = {{
                    height: this.state.height + "px",
                    width: this.state.itemWidth + "px"
                }}
                key = { index }
            >
                <ProductImageEditComponent
                    imageModel = { imageModel }
                    state = { imageModel.state }
                />
            </div>
            
        )
    }

    componentDidMount() {
        super.componentDidMount()

        // find initial main photo
        this.state.data.map((imageModel, index, array) => {
            if (imageModel.isMain) {
                imageModel.isSelected = true
            }
        })

        this.updateComponent()
    }

    onChangeSelectStatus() {
        this.state.data.map((imageModel, index, array) => {
            if (imageModel.img) {

                imageModel.isMain = false
                if (imageModel.isSelected) {
                    imageModel.isMain = true
                }

            }
        })

        
    }

    isSelectable(imageModel) {
        return imageModel.state === LOAD_STATES.READY || imageModel.state === LOAD_STATES.LOADING
    }

    onSelectTile(element) {
        if (this.props.onSelectTile) {
            this.props.onSelectTile()
        }
    }

   



}


function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps)(ProductPhotoEditSliderComponent)


