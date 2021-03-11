import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { hidePopupAction, showAlertPopupAction } from "../../common/actions/popup-actions"
import { loginAction } from "./actions/login-actions"

import { switchToRegisterPageAction } from "../../common/actions/page-actions"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import NotAuthPage from "../../common/components/NotAuthPage"

import {loginListener} from "./actions/login-actions"

import "./styles/login-styles.css"

class LoginPage extends NotAuthPage {

    constructor(props) {
        super(props)

        this.state = {

            phoneNumber: "",
            password: ""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            );

    }

    handleSubmit(event) {
        event.preventDefault()


        const data = {
            loginModel: {
                ...this.state
            },
            onSuccess: () => {this.props.history.push("/home")}
        }

        const lListener = loginListener(data)
        this.props.showAlertPopup(lListener.styleWaiting, lListener.waitingDiv)
        this.props.loginA(data, lListener)

    }

    renderContent() {
        return (

            <div>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label>
                        <span>Телефон:</span>
                        <input name="phoneNumber" type="text" onChange={this.handleChange} />
                    </label>

                    <label>
                        <span>Пароль:</span>
                        <input name="password" type="password" onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Отправить" />
                </form>

                <Link to={"/register"}>
                    <span>Registration</span>
                </Link>
            </div>

        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction,
            showAlertPopup: showAlertPopupAction,

            loginA: loginAction,
            openRegisterTab: switchToRegisterPageAction
        },
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(LoginPage))

