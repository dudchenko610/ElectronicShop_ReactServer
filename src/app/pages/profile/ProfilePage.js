import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {LOAD_STATES} from "../../../core/load-states"

import ProgressBar from "../../common/components/ProgressBar"

import { hidePopupAction, showWaitingAction } from "../../common/actions/popup-actions"
import { switchToProfileSettingsPageAction } from "../../common/actions/page-actions"


import ImageComponent from "../../common/components/image/ImageComponent"

import MeUserImageComponent from "../../common/specific-components/users/me-user-images/MeUserImageComponent"

import AuthPage from "../../common/components/AuthPage"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom";

import "./styles/profile-styles.css"


class ProfilePage extends AuthPage {

    renderContent() {

        const user = this.props.meuserReducer.user
        const avatarModel = this.props.meuserReducer.avatarModel

        console.log(user) 
        console.log(avatarModel)


        return (

            <div>
                <div className="profile-container">

                    <div className = "profile-data-container">

                        <div
                            style = {
                                {
                                    width: "90px",
                                    height: "90px"
                                }
                            }
                        >

                            <MeUserImageComponent 
                                imageModel = { avatarModel }
                                state = { avatarModel.state }
                            />
                            
                        </div>

                        


                        <div className="user-data">
                            <label>
                                <span>Имя: { user.name }</span>
                            </label>    

                            <label>
                                <span>Фамилия:  { user.surname }</span>
                            </label>

                            <label>
                                <span>Телефон:  { user.phoneNumber }</span>
                            </label>

                            <label>
                                <span>Email:  { user.email }</span>
                            </label>

                            <label>
                                <span>Возраст:  { user.age }</span>
                            </label>

                        </div>
                    
                    </div>
                    

                    <div className = "profile-settings-container">

                        <Link to={"/profilesettings"}>
                            <span>Profile Settings</span>
                        </Link>

                       
                        
                    </div>

                </div>

                {this.props.meuserReducer.isAdmin ? <p>Owner</p> : <p>Client</p>}


            </div>

        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction,
            openProfileSettingsTab: switchToProfileSettingsPageAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ProfilePage))

