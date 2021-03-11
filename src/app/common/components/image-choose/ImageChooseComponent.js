import React, {Component} from "react"

import {LOAD_STATES} from "../../../../core/load-states"

import ImageComponent from "../image/ImageComponent"

import "./styles/image-choose-styles.css"

// imageModel
// style
// onFileChoosen
// onFileDetached

class ImageChooseComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleFileChanged = this.handleFileChanged.bind(this)
    }

    handleFileChanged(event) {
        
        
        if (event.target.files.length < 1) {

            this.props.imageModel.state = LOAD_STATES.NONE
            this.props.imageModel.img = null

            this.setState
            (
                function (state, props) {
                    return {
                        ...state,
                        selectedFile: null
                    }
                }
            )

            this.props.onFileDetached()
            return
        }

        const file = event.target.files[0]

        const url = window.URL.createObjectURL(file)

        const img = new Image()
        img.onload = () => {
            this.props.imageModel.img = url
            this.props.imageModel.file = file
            this.props.imageModel.state = LOAD_STATES.READY

            this.props.imageModel.width = img.width
            this.props.imageModel.height = img.height

            //console.log("NEW IMAGE width", this.props.imageModel.width);
            //console.log("NEW IMAGE height: ", this.props.imageModel.height);

            this.setState
            (
                function (state, props) {
                    return {
                        ...state,
                        selectedFile: file
                    }
                }
            )

            this.props.onFileChoosen(file)
        }

        img.src = url

        this.setState
        (
            function (state, props) {
                return {
                    ...state
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

    render() {

        let data = (
            <>
                <input 
                    type="file" 

                    onClick = {
                        (event) => {
                            if (this.props.stopPropagation) {
                                event.stopPropagation()
                            }
                        }
                    }

                    onChange={this.handleFileChanged} 
                />

            </>
        )

       


        switch (this.props.imageModel.state) {
            case LOAD_STATES.UPLOADING:
            case LOAD_STATES.LOADING:
                data = (
                    <span></span>
                )
            default:
                break
        }

     /*   console.log("render() { Choose")
        console.log(this.props.style)*/

     //   console.log("renderrrrrrrrrrrrr")

        return (
            <div 
                
                style = {this.props.style}
                className = "image-choose-holder">

                <ImageComponent
                    style = {
                        {
                            // without it: ImageComponent - will not be updated
                        }
                    }
                    imageModel = {this.props.imageModel}
                    state = { LOAD_STATES.READY }
                 
                />

                {
                    data
                }
            </div>
        )
       
    }

}




export default ImageChooseComponent