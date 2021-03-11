import React, {Component} from "react"

import ProgressBar from "../ProgressBar"

import {LOAD_STATES} from "../../../../core/load-states"

import "./styles/loading-component-styles.css"

class LoadingComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            wrapperRef: React.createRef(),

            centered: true
        }
    }

    updateComponent() {
        this.setState
        (
            function (state, props) {
                return {
                    ...state
                }
            }
        )
    }

    setLoadingState(state) {
        this.setState({state: state})
    }

    setLoading() {
        this.setState({state: LOAD_STATES.LOADING})
    }

    setReady() {
        this.setState({state: LOAD_STATES.READY})
    }

    setFailed() {
        this.setState({state: LOAD_STATES.FAILED})
    }

    setNone() {
        this.setState({state: LOAD_STATES.NONE})
    }

    onLoading() {
        return <ProgressBar sqSize= "50" phase = {Math.random() * 100} strokeWidth = "1"/>
    }

    onFailed() {
        return (
            <span></span>
        )
    }

    onNone() {
        return (
            <span></span>
        ) 
    }

    renderContent() {
        return (
            <span></span>
        )
    }

    onUploading() {
        return (
            <span></span>
        )
    }

    onUploadingFailed() {
        return (
            <span></span>
        )
    }


    render() {
        if (this.state.centered) {
            return this.renderCentered()
        } else {
            return this.renderNotCentered()

        }

        
    }

    renderCentered() {
        switch(this.props.state) {
            case LOAD_STATES.READY:

                return this.renderContent()
            case LOAD_STATES.UPLOADING:
                return (
                    <div 
                        className = "center-notification-pb-txt"
                        style = {this.props.style}
                    >
                        { this.onUploading() }
                    </div>
                )
            case LOAD_STATES.UPLOADING_FAILED:
                return (
                    <div 
                        className = "center-notification-pb-txt"
                        style = {this.props.style}
                    >
                        { this.onUploadingFailed() }
                    </div>
                )   
            case LOAD_STATES.LOADING:
                return (
                    <div 
                        className = "center-notification-pb-txt"
                        style = {this.props.style}
                    >
                        {this.onLoading()}
                    </div>
                )
            case LOAD_STATES.FAILED:
                return (
                    <div 
                        className = "center-notification-pb-txt"
                        style = {this.props.style}
                    >
                        {this.onFailed()}
                    </div>
                )
            default:
                return (
                    <div 
                        className = "center-notification-pb-txt"
                        style = {this.props.style}
                    >
                        {this.onNone()}
                    </div>
                )
        }
    }

    renderNotCentered() {
        switch(this.props.state) {
            case LOAD_STATES.READY:
                return this.renderContent()
            case LOAD_STATES.UPLOADING:
                return this.onUploading()
            case LOAD_STATES.UPLOADING_FAILED:
                return this.onUploadingFailed() 
            case LOAD_STATES.LOADING:
                return this.onLoading()
            case LOAD_STATES.FAILED:
                return this.onFailed()
            default:
                return this.onNone()
        }
    }

}

export default LoadingComponent
