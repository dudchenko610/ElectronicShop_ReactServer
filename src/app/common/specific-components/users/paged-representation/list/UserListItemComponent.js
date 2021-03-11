import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"


import UserImageComponent from "../../user-images/UserImageComponent"

import "./styles/user-item-styles.css"

// userId
class UserListItemComponent extends Component {

    constructor(props) {
        super(props)
    }

    

    render() {

        const user = this.props.userDataReducer.content.get(this.props.userId)

        return (
            <div className = "user-console-item-list">

                <div className = "user-console-item-image-wrapper">

                    <UserImageComponent        
                        imageModel = { user.imageModel }
                        state = { user.imageModel.state }
                    />

                </div>

                <div className = "user-console-item-data-wrapper">
                    <Link className='user-name' to={"/user/" + user.id }>
                        <span>{ user.name + " " + user.surname} </span>
                    </Link>

                    <div>
                        PhoneNumber: { user.phoneNumber }
                    </div>

                    
                    
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        userDataReducer : state.userDataReducer
    }
}


export default connect(mapStateToProps)(UserListItemComponent)

