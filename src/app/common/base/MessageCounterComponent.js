import React from "react"
import { connect } from "react-redux"

import LoadingComponent from "../components/loading-component/LoadingComponent"


class MessageCounterComponent extends LoadingComponent {

    onFailed() {
        return (
            <div>
                Fail Img
            </div>
        )
    }

    renderContent () {

        let unreadMessagesCounter = 0

        const contactInfosMap = this.props.chatReducer.content

        contactInfosMap.forEach((contactInfo, index) => {
            unreadMessagesCounter += contactInfo.unreadCount
        })

        return (
            <div>
                { unreadMessagesCounter }
            </div>
        ) 
    }

}

function mapStateToProps(state) {

    return {
        chatReducer: state.chatReducer,
        state: state.chatReducer.state
    }
}
    
export default connect(mapStateToProps)(MessageCounterComponent)
    
