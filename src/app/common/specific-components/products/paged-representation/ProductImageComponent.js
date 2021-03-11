import React from "react"
import { connect } from "react-redux"

import ProgressBar from "../../../components/ProgressBar"

import ImageComponent, { matchDispatchToPropsImageActions } from "../../../components/image/ImageComponent"

class ProductImageComponent extends ImageComponent {

    onLoading() {
        return (
            <div className = "other-than-ready-container">
                <ProgressBar sqSize= "30" phase = {Math.random() * 100} strokeWidth = "2"/>
                <label>Downloading</label>
            </div>
        )
    }
    
}

function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(ProductImageComponent)


