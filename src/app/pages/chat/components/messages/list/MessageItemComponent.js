import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import ProgressBar from "../../../../../common/components/ProgressBar"
import LoadingComponent from "../../../../../common/components/loading-component/LoadingComponent"

import { resendMessageAction } from "../actions/message-actions"


import "./styles/message-item-styles.css"

class MessageItemComponent extends LoadingComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            centered: false
        }
    }

    onFailed() {
        return (
            <div className = "state-el">
                <a className = "message-error-btn">Error</a>
                <a 
                    className = "message-reload-btn"
                    onClick = {
                        (e) => {
                            const message = this.props.message
                            this.props.resendMessage(message)
                        }
                    }
                >Resend</a>
            </div>
        )
    }

    onLoading() {
        return (
            <div className = "state-el">
                <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/>
            </div>
        )
    }

    renderContent() {
        return (
            <div className = "state-el">
                <label className = "message-creation-time">{this.props.message.dateTime.hour} : {this.props.message.dateTime.minute}</label>
            </div>
        )
    }

    render() {

        const isRead = this.props.message.statesHash.get(this.props.message.receiverUserId)
    
        return (
            <div className="message-container" style = {

                this.props.message.authorUserId === this.props.meUser.id ? 
                    {
                        alignItems: "flex-end"
                    }
                    :
                    {
                        alignItems: "flex-start"
                    }
                
            }>
                <label className = "message-content">{this.props.message.content}</label>

                <div className = "state-read-unread-container">
                    { super.render() }

                    {this.props.message.authorUserId === this.props.meUser.id ?
                        (isRead ? <label>+</label> : <label>-</label>) : <div></div>}
                    
                </div>
                        
            </div>
        )
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            resendMessage: resendMessageAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meUser: state.meuserReducer.user,
        chatReducer: state.chatReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageItemComponent)

