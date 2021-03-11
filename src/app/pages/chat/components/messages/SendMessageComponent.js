import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {sendMessageAction} from "./actions/message-actions"
import {resetCurrentChatAction} from "../chat-list/actions/contacts-actions"


import "./styles/message-comp-styles.css"
import { LOAD_STATES } from "../../../../../core/load-states"

// scroll to bottom
class SendMessageComponent extends Component {

    constructor(props) {
        super(props)

        this.scrollToBottom = true

        this.handleChangeMessageContent = this.handleChangeMessageContent.bind(this)
        this.handleSendMessage = this.handleSendMessage.bind(this)

        this.state = {
            contentToSend: ""
        }

    }

    handleChangeMessageContent(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({[name]: value})
    }

    handleSendMessage(event) {
        this.props.sendMessage(this.state.contentToSend, this.props.userId)

        this.setState({contentToSend: ""})

       // this.scrollView.scrollIntoView({ block: "end", behavior: "smooth" })
    }


    render() {

        return (
            <div className = "message-tap-panel">
                
                <input name = "contentToSend"  value={ this.state.contentToSend } onChange={ this.handleChangeMessageContent }></input>
                <a onClick = { (e) => this.handleSendMessage(e)}>Send</a>
                <a onClick = { (e) => { this.props.onScrollToBottom() } } >Scroll to bottom</a>

            </div> 
        )

        
    }
}

//this.scrollView.scrollIntoView({ block: "end", behavior: "smooth" })

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            sendMessage : sendMessageAction
        },
        dispatch
    )
}

export default connect(null, matchDispatchToProps)(SendMessageComponent)

