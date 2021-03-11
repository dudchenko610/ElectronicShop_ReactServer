import React, {Component} from "react"

import ProgressBar from "../ProgressBar"

import {LOAD_STATES} from "../../../../core/load-states"

import "./styles/loading-component-styles.css"

class ReloadableComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            state : LOAD_STATES.READY,
            wrapperRef: React.createRef(),

            isComleted: false,
            isFirstRendered: false,
            isFirstNone: false
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
        this.state.state = state
    }

    setLoading() {
        this.state.state = LOAD_STATES.LOADING
    }

    setReady() {
        this.state.state = LOAD_STATES.READY
    }

    setFailed() {
        this.state.state = LOAD_STATES.FAILED
    }

    setNone() {
        this.state.state = LOAD_STATES.NONE
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

    onUpdate() {

    }

    onStart() {

    }

    onUploading() {
        return (
            <span></span>
        )
    }

    onUoloadingFailed() {
        return (
            <span></span>
        )
    }



    render() {

        if (!this.state.isComleted) {
            this.state.isComleted = true
            this.onStart()
        }

        this.onUpdate()

        let state = this.state.state

        if (this.props.state) {
            state = this.props.state
        }

        switch(state) {
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
                        { this.onUoloadingFailed() }
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

}

export default ReloadableComponent