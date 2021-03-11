import React, { Component } from "react"

import ContactsListComponent from "./ContactsListComponent"

import "../../styles/chat-styles.css"

class ContactsSectionComponent extends Component {

    render() {
        return (
            <div className = "chat-panel-wrapper">
                <ContactsListComponent/>
            </div>
        )
    }

}

export default ContactsSectionComponent