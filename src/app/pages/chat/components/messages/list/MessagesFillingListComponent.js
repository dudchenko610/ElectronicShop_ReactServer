import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {sendMessageAction} from "../actions/message-actions"

import MessageItemComponent from "./MessageItemComponent"
import FillingListComponent from "../../../../../common/components/filling-list/FillingListComponent"

import "../styles/message-comp-styles.css"
import { LOAD_STATES } from "../../../../../../core/load-states"


class MessagesFillingListComponent extends FillingListComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
           // isReverse : true
        }

    }

    onReadyElement(message, index) {
        return (
            <MessageItemComponent 
                key = {index + 100000}
                message = { message }
                state = { message.state }
            />
        )
    }

  
}


/*
function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            sendMessage : sendMessageAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

//    console.log(state.chatReducer)

    return {
        chatReducer : state.chatReducer,

        data: state.chatReducer.currentChatModel.contactInfo.messagesModel.messages,
    //    state: state.chatReducer.currentChatModel.contactInfo.messagesModel.state
        

    }
}*/

//export default connect(mapStateToProps, matchDispatchToProps)(MessagesFillingListComponent)

export default MessagesFillingListComponent


