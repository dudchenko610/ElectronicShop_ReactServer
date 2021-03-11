import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import UserImageComponent from "../UserImageComponent"
import { pickUpContactAction } from "./actions/contacts-actions"

import "./styles/contact-user-item.css"

class ContactItemComponent extends Component {

    render() {
        
        const contactInfo = this.props.chatReducer.content.get(this.props.userId)
        const user = contactInfo.user

        return (

            <div 
                className="contact-user-item" 
                onClick={
                    () => {
                        this.props.pickUpContact(contactInfo)
                    }
                }

                style = {
                    
                    contactInfo === this.props.chatReducer.currentChatModel.contactInfo ? 
                        {
                            border : "1px  solid red"
                        } 
                        : 
                        {

                        }
                    }
            >
                <div 
                    className="contact-avatar-part"
                    style = {
                        {
                            height: "50px",
                            width: "50px"
                        }
                    }
                >

                    <UserImageComponent
                        imageModel = { user.imageModel }
                        state = { user.imageModel.state }
                    />

                </div>

                <div className="contact-info-part">

                    <div className="contact-name-surname">

                        <Link className='user-name' to={"/user/" + user.id }>
                            <label>{user.name + " " + user.surname}</label>
                        </Link>

                    </div>  

                    <label>Unread messages: { contactInfo.unreadCount }</label>

                </div>  
                
            </div>


        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            pickUpContact : pickUpContactAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        chatReducer: state.chatReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactItemComponent)

