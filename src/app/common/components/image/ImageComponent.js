import React, { useEffect } from "react"
import { bindActionCreators } from "redux"

import LoadingComponent from "../loading-component/LoadingComponent"
import ProgressBar from "../ProgressBar"

import {LOAD_STATES} from "../../../../core/load-states"
import {uploadImageAction, downloadImageAction} from "./actions/image-actions"

import "./styles/image-styles.css"


// imageModel
// style
// isUploadable - state
// uploadLabel - state

class ImageComponent extends LoadingComponent {


    constructor(props) {
        super(props)


        this.state = {
            ...this.state,
            selectedFile : null,
            toBeUploadedImageModel: null,

            containerRef: React.createRef()
            
        }

        this.handleFileChanged = this.handleFileChanged.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize) // it takes current state snapshot

        this.updateComponent()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {
        this.updateComponent()

        setTimeout(() => {
            this.updateComponent()
        }, 50)
    }

    calculatePercentBorders(imgWidth, imgHeight) {
        let widthPercents = 0
        let heightPercents = 0

        const wrapperStyle = getComputedStyle( this.state.containerRef.current )
    
        const wrapperWidth  = parseFloat(wrapperStyle.width)
        const wrapperHeight = parseFloat(wrapperStyle.height)

        const tempHeight = ( wrapperWidth / wrapperHeight ) * ( imgHeight / imgWidth ) * 100

        if (tempHeight > 100) {
            heightPercents = 100
            widthPercents = ( wrapperHeight / wrapperWidth ) * ( imgWidth / imgHeight ) * 100
        } else {
            widthPercents = 100
            heightPercents = tempHeight
        }


        return {
            widthPercents: widthPercents,
            heightPercents: heightPercents
        }
    }

    renderContent() {
        return this.onReadyContent(this.props.imageModel.width, this.props.imageModel.height, this.props.imageModel.img)
    }

    onFailed() {
        return (
            <div className = "other-than-ready-container" >
                <label>Failed to download</label><br/>
                <a onClick = {() => {this.props.downloadImage(this.props.imageModel)}}>Reload</a>
            </div>
        )
    }

    onLoading() {
        return (
            <div className = "other-than-ready-container">
                <ProgressBar sqSize= "90" phase = {Math.random() * 100} strokeWidth = "2"/>
                <label>Downloading</label>
            </div>
        )
    }

    onUploading() {
        return (
            <div className = "other-than-ready-container">
                <ProgressBar sqSize= "90" phase = {Math.random() * 100} strokeWidth = "2"/>
                <label>Uploading</label>
            </div>
        )
    }

    onUploadingFailed() {
        return (
            <div className = "other-than-ready-container">
                <label>Failed to upload</label><br/>
                <a onClick = {() => {this.props.uploadImage(this.props.imageModel, this.props.imageModel.currentlyUploadFile)}}>Reload</a>
            </div>
        )
    }

    onNone() {
        return this.onReadyContent(this.props.imageModel.noImgWidth, this.props.imageModel.noImgHeight, this.props.imageModel.noImg)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if ((!prevState.containerRef.current && this.state.containerRef.current) 
            || (prevProps.state !== LOAD_STATES.READY && this.props.state === LOAD_STATES.READY)) {

            this.updateComponent()

            setTimeout(() => {
                this.updateComponent()
            }, 100)
        }
    }


    onReadyContent(width, height, img) {
        

        return (
            <div className = "image-holder">
                {
                    this.onImgHolder(width, height, img)
                }
            </div>
        )
    }

    onImg(img) {

        
        return (
            <img
                style = { {width: "100%", height: "100%"} }
                src = { img }
            >
                
            </img>
        )
    }

    onImgPrepare(img) {
        return this.onImg(img)
    }


    onImgHolder(width, height, img) {


        let widthPercents = 0
        let heightPercents = 0

        if (this.state.selectedFile) {

            width = this.state.toBeUploadedImageModel.width
            height = this.state.toBeUploadedImageModel.height

            img = this.state.toBeUploadedImageModel.img

            const ratio = this.calculatePercentBorders( width, height )

            widthPercents = ratio.widthPercents
            heightPercents = ratio.heightPercents
            
        } else {
            if ( this.state.containerRef  &&  this.state.containerRef.current) {
                const ratio = this.calculatePercentBorders( width, height )

                widthPercents = ratio.widthPercents
                heightPercents = ratio.heightPercents
            }
            
        }


        const imgHolderStyle = this.state.isUploadable ? { height: "70%" } : {  }

        return (
            <>
                <div 
                    className = "img-holder"
                    ref = { this.state.containerRef }
                    style = { imgHolderStyle }
                >
                    <div
                        style = { { width: (widthPercents + "%"), height: (heightPercents + "%"), position: "relative" } }
                    >
                        {
                            this.onImgPrepare(img)
                        }
                    </div>
                    
                </div>

                {
                    this.state.isUploadable ?
                    <div className = "upload-holder">
                        <input type="file" onChange={this.handleFileChanged}  />

                        {

                            this.state.selectedFile ?

                            <>
                            
                                <a onClick={
                                    (e) => {
                                        this.props.uploadImage(this.props.imageModel, this.state.selectedFile)
                                        this.setState({ selectedFile: null })
                                    }
                                }
                                >{this.state.uploadLabel}</a>

                                <a onClick={
                                    (e) => {
                                        this.setState({ selectedFile: null, toBeUploadedImageModel: null })
                                    }
                                }
                                >Cancel</a>

                            </>
                            
                            :

                            ""
                            
                        }

                    </div>
                    :
                    <></>
                }
               
            </>
        )
    }


    handleFileChanged(event) {

        console.log(event.target.files)

        if (event.target.files.length < 1) {
            this.setState({selectedFile : null})
        } else {

            console.log("} else {")

            const file = event.target.files[0]
            const url = window.URL.createObjectURL(file)

            const img = new Image()
            img.onload = () => {

                const toBeUploadedImageModel = {}

                toBeUploadedImageModel.img = url
                toBeUploadedImageModel.file = file
                toBeUploadedImageModel.state = LOAD_STATES.READY

                toBeUploadedImageModel.width = img.width
                toBeUploadedImageModel.height = img.height

                this.setState({
                    selectedFile: file,
                    toBeUploadedImageModel: toBeUploadedImageModel
                })

                //console.log("NEW IMAGE width", this.props.imageModel.width);
                //console.log("NEW IMAGE height: ", this.props.imageModel.height);

            }

            img.src = url

        }

        event.target.value = null

    }

}

export function matchDispatchToPropsImageActions(dispatch) {
    return bindActionCreators(
        {
            uploadImage: uploadImageAction,
            downloadImage: downloadImageAction
        },
        dispatch
    )
}

export default ImageComponent
