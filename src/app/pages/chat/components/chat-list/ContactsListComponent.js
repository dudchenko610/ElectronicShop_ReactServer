import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import ListComponent from "../../../../common/components/list-wrapper/ListComponent"
import ContactItemComponent from "./ContactItemComponent"

import { getContactsAction } from "./actions/contacts-actions"


class ContactsListComponent extends ListComponent {

    onNone() {
        return <p>You have not any contacts still</p>
    }

    onEmptyList() {
        return <p>You have not any contacts still</p>
    }


    onFailed() {
        return (
            <div>
                <p>Failed</p>
                <a
                    onClick = {
                        (event) => {
                            this.props.getContacts()
                        }
                    }
                >Reload</a>
            </div>
        )
    }

    onReadyElement(userId, index, array) {
        return <ContactItemComponent 
                key = { index }
                userId = { userId }
            />
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getContacts : getContactsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        data: Array.from( state.chatReducer.content.keys() ),
        state: state.chatReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactsListComponent)