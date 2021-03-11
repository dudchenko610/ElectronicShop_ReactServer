import React, { Component } from "react"
import { connect } from "react-redux"

import UserImageComponent from "../UserImageComponent"
import "./styles/contact-header-styles.css"


class ContactHeaderComponent extends Component {

    render() {

        const contactInfo = this.props.chatReducer.content.get(this.props.userId)

        return (

            <div className="contact-header-item">
                <div 
                    className="contact-header-avatar-part"
                >
                    <UserImageComponent
                        imageModel = { contactInfo.user.imageModel }
                        state = { contactInfo.user.imageModel.state }
                        
                    />
                </div>

                <div className="contact-header-info-part">
                    <div className="contact-header-name-surname">
                        <div>{ contactInfo.user.name + " " + contactInfo.user.surname}</div>
                    </div>  
                </div>  
                
            </div>


        )
    }
}


function mapStateToProps(state) {
    return {
        chatReducer: state.chatReducer,
    }
}

export default connect(mapStateToProps)(ContactHeaderComponent)

