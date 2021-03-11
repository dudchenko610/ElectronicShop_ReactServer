import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import { showWaitingPopupAction, showAlertPopupAction, hidePopupAction } from "../actions/popup-actions"
import { initSystemAuthAction, initSystemCommonAction } from "../actions/system-init-actions"
import { logoutAction } from "../actions/meuser-actions"

import { ROUTES, SUBROUTES } from "../../../core/routes"

import MessageCounterComponent from "./MessageCounterComponent"


import "../styles/header-styles.css"
import "../styles/base-styles.css"


class Header extends Component {

    componentDidMount() {

        this.props.initSystemCommon()

        if (this.props.meuserReducer.isAuthenticated) {
            this.props.initSystemAuth()
        } 
    }

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="header-inner">

                        <div className="header-logo">Electronics Shop</div>

                        <nav className="nav-common">
                            <Link className='nav-link' to={ ROUTES.HOME }>
                                <span>Home</span>
                            </Link>

                            <Link className='nav-link' to={ ROUTES.TEST }>
                                <span>Test</span>
                            </Link>

                            {
                                this.props.meuserReducer.isAuthenticated ?
                                    <Link className='nav-link' to={ ROUTES.USERS }>
                                        <span>Users</span>
                                    </Link>
                                :
                                null
                            }
                            <Link className='nav-link' to={ ROUTES.CHAT }>
                                <span>Chat</span>
                            </Link>

                            <Link className='nav-link' to={ ROUTES.PROFILE }>
                                <span>Profile</span>
                            </Link>

                            {
                                this.props.meuserReducer.isAdmin ?

                                <Link className='nav-link' to={ ROUTES.CONSOLE + SUBROUTES.CONSOLE.PRODUCTS }>
                                    <span>Console</span>
                                </Link>
                                
                                : 
                                ""
                            }

                            <div 
                                style = {
                                    {
                                        height: "20px",
                                        width: "20px"
                                    }
                                }
                            >
                                <MessageCounterComponent/>

                            </div>

                        </nav>

                        <nav className="nav-auth-basket">

                            
                            <div>

                                {
                                    !this.props.meuserReducer.isAdmin ? 
                                        <Link className='nav-link2' to={ ROUTES.BASKET }>
                                            <span>Basket</span>
                                        </Link>
                                    :
                                        null
                                }

                                {
                                    this.props.meuserReducer.isAuthenticated 
                                    ?

                                        <a className="nav-link2" onClick={
                                            () => 
                                            {
                                                this.props.logout()
                                                this.props.history.push(ROUTES.HOME)
                                            }
                                            }
                                        >Logout</a>
                                        
                                    :
                                        <Link className='nav-link2' to={ ROUTES.LOGIN }>
                                            <span>Login</span>
                                        </Link>
                                            
                                }

                            </div> 


                        </nav>

                    </div>

                </div>
            </header>

        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {

            showWaitingPopup: showWaitingPopupAction,
            showAlertPopup: showAlertPopupAction,
            hidePopup: hidePopupAction,

            initSystemAuth: initSystemAuthAction,
            initSystemCommon: initSystemCommonAction,

            logout: logoutAction,

        },
        
        dispatch
    )
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(Header))

