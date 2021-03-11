import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import EditComponent from "../../common/components/edit/EditComponent"

import MeUserImageUplComponent from "../../common/specific-components/users/me-user-images/MeUserImageUplComponent"

import { showAlertPopupAction } from "../../common/actions/popup-actions"
import { updateUserAction } from "./actions/profile-settings-actions"

import {profileSettingsListener} from "./actions/profile-settings-actions"

import "./styles/profile-settings-styles.css"

class ProfileSettingsPage extends EditComponent {

    constructor(props){
        super(props)

        this.state.mounted = null
    }

    onEdited(editable) {


        const sListener = profileSettingsListener(editable)
        this.props.showAlertPopup(sListener.styleWaiting, sListener.waitingDiv)
        this.props.updateUser(editable, sListener)
    }

    render() {

        if (!this.state.mounted && this.props.editable) {
            this.state.mounted = true

            this.state.editable = {
                ...this.props.editable
            }
        }

        if (!this.props.editable) {
            return <></>
        }

        return (

            <div className="profile-container">

                <div className = "profile-data-container">
                    <div className="user-data">
                        <label>
                            <span>Имя:</span>
                            <input name="name" type="text" value={this.state.editable.name || ''} /*defaultValue={this.props.editable.name } */onChange={this.handleChange} />
                        </label>

                        <label>
                            <span>Фамилия:</span>
                            <input name="surname" type="text" value={this.state.editable.surname || ''}/* defaultValue={this.props.editable.surname || ''}*/ onChange={this.handleChange} />
                        </label>

                        <label>
                            <span>Email: </span>
                            <input name="email" type="text" value={this.state.editable.email || ''} /*defaultValue={this.props.editable.email || ''}*/ onChange={this.handleChange} />
                        </label>

                        <label>
                            <span>Возраст: </span>
                            <input name="age" type="text" value={this.state.editable.age || ''} /*defaultValue={this.props.editable.age || ''}*/ onChange={this.handleChange} />
                        </label>

                        <a onClick={(e) => this.handleEdit(e)}>Save Changes</a>
                    </div>

                </div>

                <div className = "profile-data-upload-image">
                    <MeUserImageUplComponent 
                        imageModel = { this.props.avatarModel }
                        state = { this.props.avatarModel.state }
                        uploadLabel = "Upload Avatar"
                    />
                </div>


            </div>

        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateUser: updateUserAction,

            showAlertPopup: showAlertPopupAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {

        editable: state.meuserReducer.user,
        meuserReducer: state.meuserReducer,

        avatarModel: state.meuserReducer.avatarModel
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileSettingsPage)

