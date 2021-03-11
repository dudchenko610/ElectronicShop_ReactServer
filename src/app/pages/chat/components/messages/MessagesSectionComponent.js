import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {sendMessageAction} from "./actions/message-actions"
import {resetCurrentChatAction} from "../chat-list/actions/contacts-actions"

import { LOAD_STATES } from "../../../../../core/load-states"

import ContactHeaderComponent from "./ContactHeaderComponent"

import SendMessageComponent from "./SendMessageComponent"
import MessagesListComponent from "./list/MessagesListComponent"

import MessagesListComponent2 from "./list/MessagesListComponent2"


import "./styles/message-comp-styles.css"


class MessagesSectionComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        const contactInfo = this.props.chatReducer.currentChatModel.contactInfo

        if (!contactInfo) {
            return (
                <div className="messages-panel-wrapper">
                    <div className = "center-notification-pb-txt">
                        <label>Choose a chat</label>
                    </div>
                </div>
            )
            
        }

        const user = contactInfo.user

        return (
            <div className="messages-panel-wrapper">
                

                <div className = "user-chat-info">
                    <ContactHeaderComponent userId = { user.id }/>
                </div>

                    
                <MessagesListComponent
                    scrollToBottom = { this.state.scrollToBottom }
                />
                <SendMessageComponent 
                    userId = { user.id }
                    onScrollToBottom = {
                        () => {
                            this.setState( { scrollToBottom: true } )
                        }
                    }
                />
            </div>
        )

        
    }

    componentDidUpdate() {
        if (this.state.scrollToBottom) {
            this.setState( { scrollToBottom: false })
        }
    }


}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            sendMessage : sendMessageAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        chatReducer: state.chatReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(MessagesSectionComponent)

