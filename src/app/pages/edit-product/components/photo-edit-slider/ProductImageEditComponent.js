import React from "react"
import { connect } from "react-redux"
import { LOAD_STATES } from "../../../../../core/load-states"
import ImageComponent, { matchDispatchToPropsImageActions } from "../../../../common/components/image/ImageComponent"
import ProgressBar from "../../../../common/components/ProgressBar"

import "./styles/product-image-edit-styles.css"

class ProductImageEditComponent extends ImageComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            toRemoveImg: false
        }
    }

    onFailed() {
        return (
            <div className = "other-than-ready-container" >
                <label>Failed to download</label><br/>
                <a onClick = {(e) => { e.stopPropagation(); this.props.downloadImage(this.props.imageModel)}}>Reload</a>

                <div 
                    onClick = {
                        (e) => {
                            e.stopPropagation()
                            this.props.imageModel.toRemoveImg = !this.state.toRemoveImg
                            this.setState( { toRemoveImg: !this.state.toRemoveImg } )
                        }
                    }
                >
                    { this.state.toRemoveImg ? "Restore" : "Remove" }
                </div>

            </div>
        )
    }

    onLoading() {
        return (
            <div className = "other-than-ready-container">
                <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "2"/>
                <label>Downloading</label>
            </div>
        )
    }

    
    onImgPrepare(img) {
        return (
            <>
                {
                    this.onImg(img)
                }

                <div 
                    className = "product-photo-edit-switcher"
                    onClick = {
                        (e) => {
                            e.stopPropagation()
                            this.props.imageModel.toRemoveImg = !this.state.toRemoveImg
                            this.setState( { toRemoveImg: !this.state.toRemoveImg } )
                        }
                    }
                >
                    { this.state.toRemoveImg ? "Restore" : "Remove" }
                </div>
            </>
        )
    }


    
}

function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps, matchDispatchToPropsImageActions)(ProductImageEditComponent)


