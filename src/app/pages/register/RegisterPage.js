import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { hidePopupAction, showAlertPopupAction } from "../../common/actions/popup-actions"
import { registerAction } from "./actions/register-actions"

import "./styles/register-styles.css"

import NotAuthPage from "../../common/components/NotAuthPage"
import { withRouter } from "react-router-dom"

import { registerListener } from "./actions/register-actions"

class RegisterPage extends NotAuthPage {

    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    [name]: value
                }
            }
        )

    }

    handleSubmit(event) {
        event.preventDefault()

        const data = {
            registerModel: {
                ...this.state
            },
            onSuccess: () => {
                this.props.history.push("/home")
            }
        }

        const rListener = registerListener(data)
        this.props.showAlertPopup(rListener.styleWaiting, rListener.waitingDiv)
        this.props.register(data, rListener)

    }

    renderContent() {
        return (
            <form className="login-form" onSubmit={this.handleSubmit}>

                <label>
                    <span>Имя:</span>
                    <input name="name" type="text" onChange={this.handleChange} />
                </label>

                <label>
                    <span>Фамилия:</span>
                    <input name="surname" type="text" onChange={this.handleChange} />
                </label>

                <label>
                    <span>Телефон:</span>
                    <input name="phoneNumber" type="text" onChange={this.handleChange} />
                </label>

                <label>
                    <span>Email:</span>
                    <input name="email" type="email" onChange={this.handleChange} />
                </label>

                <label>
                    <span>Age:</span>
                    <input name="age" type="number" onChange={this.handleChange} />
                </label>

                <label>
                    <span>Пароль:</span>
                    <input name="password" type="password" onChange={this.handleChange} />
                </label>

                <input type="submit" value="Отправить" />
            </form>

        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction,
            showAlertPopup: showAlertPopupAction,
            register: registerAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(RegisterPage))

