import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import LoadingComponent from "../../common/components/loading-component/LoadingComponent"
import UserImageComponent from "../../common/specific-components/users/user-images/UserImageComponent"

import { getUserAction } from "./actions/user-actions"
import { insertContactAction } from "../chat/components/chat-list/actions/contacts-actions"
import { ROUTES } from "../../../core/routes"



class UserPage extends LoadingComponent {

    onNone() {
        return <span>No user</span>
    }

    onFailed() {
        return (
            <>
                <div>Error</div>
                <div
                    onClick = {
                        (event) => {
                            const userId = this.props.match.params.userId
                            this.props.getUser(userId)
                        }
                    }

                >Repeat</div>

            </>
        )
    }
 
    componentDidMount() {
        const userId = this.props.match.params.userId
        this.props.getUser(userId)
    }
 
    renderContent () {

        const user = this.props.user

        return (
            <div className = "user-page">

                <div
                    onClick = {
                        (event) => {
                            const userId = this.props.match.params.userId
                            this.props.getUser(userId)
                        }
                    }

                >Repeat</div>

                <div>{ user.name }</div>
                <div>{ user.surname }</div>

                <div
                    style = {
                        {
                            height: "150px",
                            width: "100px"
                        }
                    }
                >
                    <UserImageComponent        
                        imageModel = { user.imageModel }
                        state = { user.imageModel.state }
                    />

                    <div
                        onClick = {
                            (event) => {
                                this.props.insertContact(user, true)
                                this.props.history.push(ROUTES.CHAT)
                            }
                        }
                    >Write message</div>

                </div>


            </div>
        )
    }


}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getUser: getUserAction,
            insertContact: insertContactAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        userDataReducer: state.userDataReducer,
        meuserReducer: state.meuserReducer,

        state: state.userDataReducer.stateCurrent,
        user: state.userDataReducer.currentUser
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(UserPage))