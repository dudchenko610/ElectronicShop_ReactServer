import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withRouter } from "react-router-dom"

import ContactsSectionComponent from "./components/chat-list/ContactsSectionComponent"
import MessagesSectionComponent from "./components/messages/MessagesSectionComponent"

import LoadingComponent from "../../common/components/loading-component/LoadingComponent"
import { LOAD_STATES } from "../../../core/load-states"
import { ROUTES } from "../../../core/routes"

import {initSignalRAction} from "../../common/actions/signalr-actions"
import { pickUpContactAction } from "./components/chat-list/actions/contacts-actions"

import "./styles/chat-styles.css"
import "../../common/styles/reset-styles.css"

class ChatPage extends LoadingComponent {

    componentWillUnmount() {
        this.props.pickUpContact(null)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.meuserReducer.state === LOAD_STATES.LOADING) {
            return
        }

        if (!this.props.meuserReducer.isAuthenticated) {
            this.props.history.push(ROUTES.HOME)
        }
    }

    onFailed() {
        return (
            <>
                <label>Failed</label><br/>
                <a onClick = {() => {this.props.initSignalR()}}>Reload</a>
            </>
        )
    }

    renderContent() {

        if (!this.props.meuserReducer.isAuthenticated) {
            return null
        }

        return (

            <div className="chatting-tab-content-wrapper">

                <ContactsSectionComponent/>
                <MessagesSectionComponent/>
                
            </div>

        )

        
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            initSignalR: initSignalRAction,
            pickUpContact: pickUpContactAction
        },
        dispatch
    )
}


function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer,
        signalRReducer: state.signalRReducer,
        state : state.signalRReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ChatPage))


