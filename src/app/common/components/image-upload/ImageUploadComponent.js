import React, {Component} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {LOAD_STATES} from "../../../../core/load-states"

import ImageComponent from "../image/ImageComponent"

import { showAlertPopupAction } from "../../../common/actions/popup-actions"
import { uploadImageAction } from "../image/actions/image-actions"

import "./styles/image-upload-styles.css"

// imageModel
// style
// uploadLabel
// onFileChoosen - needed

class ImageUploadComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleFileChanged = this.handleFileChanged.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
    }

    handleFileChanged(event) {
        const file = event.target.files[0]

        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    selectedFile: file
                }
            }
        )

    }

    updateState() {
        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    selectedFile: null
                }
            }
        )
    }


    handleFileUpload(event) {

        if (this.state.selectedFile !== null) {
            this.props.uploadImage(this.props.imageModel, this.state.selectedFile)
            this.updateState()
        } else {
            this.props.showAlertPopup({ width : "200px", height: "200px"}, <p>Choose the file!</p>)
        }

    }

    render() {

        const sendBtn = this.state && this.state.selectedFile ? <a onClick={(e) => this.handleFileUpload(e)}>{this.props.uploadLabel}</a> : ""

        let data = (
            <>
                <input type="file" onChange={this.handleFileChanged} />
                
                {
                    sendBtn
                }
            </>
        )


        switch (this.props.imageModel.state) {
            case LOAD_STATES.UPLOADING:
            case LOAD_STATES.LOADING:
                data = (
                    <span></span>
                )
        }


        return (
            <div 
                className = "image-upload-holder"
                style = {this.props.style}
            >
                <ImageComponent
                    style = {
                        {
                            // without it: ImageComponent - will not be updated
                        }
                    }
                    imageModel = {this.props.imageModel}
                    
                />
                {
                    data
                }
            </div>
        )
       
    }

}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showAlertPopup : showAlertPopupAction,

            uploadImage : uploadImageAction
        },
        dispatch
    )
}

export default connect(null, matchDispatchToProps)(ImageUploadComponent)