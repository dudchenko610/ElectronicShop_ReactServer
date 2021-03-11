import React, { Component } from "react"
import { connect } from "react-redux"

import { ROUTES } from "../../../core/routes"

import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import ProfileSettingsPage from "../../pages/profile-settings/ProfileSettingsPage"
import ChatPage from "../../pages/chat/ChatPage"
import ConsolePage from "../../pages/console/ConsolePage"
import AddProductPage from "../../pages/add-product/AddProductPage"
import SearchPage from "../../pages/search/SearchPage"
import ProductPage from "../../pages/product/ProductPage"
import UserPage from "../../pages/user/UserPage"
import UsersPage from "../../pages/users/UsersPage"
import TestPage from "../../pages/test/TestPage"
import EditProductPage from "../../pages/edit-product/EditProductPage"
import InProgressProductPage from "../../pages/in-progress-product/InProgressProductPage"
import BasketPage from "../../pages/basket/BasketPage"

import { initPopStateListener } from "../../../core/pop-history-events"

import {
    Route,
    Switch,
    Redirect,
    withRouter
  } from "react-router-dom"

import "../styles/base-styles.css"



class ContentContainer extends Component {

    componentDidMount() {
        initPopStateListener()

        
    }

    render() {

        const { history } = this.props

        return (
            <div className="main-content-inner">
                <div className = "content-page">
                    <Switch>
                        
                        <Route history = { history } path = { ROUTES.HOME } component={HomePage} />
                        <Route history = { history } path = { ROUTES.LOGIN } component={LoginPage} />
                        <Route history = { history } path = { ROUTES.REGISTER } component={RegisterPage} />
                        <Route history = { history } path = { ROUTES.PROFILE } component={ProfilePage} />
                        <Route history = { history } path = { ROUTES.PROFILE_SETTINGS } component={ProfileSettingsPage} />
                        <Route history = { history } path = { ROUTES.CHAT } component={ChatPage} />
                        <Route history = { history } path = {`${ ROUTES.CONSOLE }/:mode`} component={ConsolePage} />
                        <Route history = { history } path = {`${ ROUTES.ADD_PRODUCT }/:categoryId/:parameter`} component={AddProductPage} />
                        <Route history = { history } path = {`${ ROUTES.SEARCH }/:productFilter?/:paginationFilter?`} component={SearchPage} />
                        <Route history = { history } path = {`${ ROUTES.PRODUCT }/:productId`} component={ProductPage} />
                        <Route history = { history } path = {`${ ROUTES.USER }/:userId`} component={UserPage} />
                        <Route history = { history } path = { ROUTES.USERS } component={ UsersPage } />
                        <Route history = { history } path = { ROUTES.TEST } component={ TestPage } />
                        <Route history = { history } path = {`${ ROUTES.EDIT_PRODUCT }/:productId`} component={ EditProductPage } />
                        <Route history = { history } path = {`${ ROUTES.IN_PROGRESS_PRODUCT }/:productId`} component={ InProgressProductPage } />
                        <Route history = { history } path = { ROUTES.BASKET } component={ BasketPage } />


                        <Redirect from='/' to = { ROUTES.HOME }/>
                    </Switch>
                </div>
            </div>

        )
    }
}

export default withRouter(ContentContainer) 
