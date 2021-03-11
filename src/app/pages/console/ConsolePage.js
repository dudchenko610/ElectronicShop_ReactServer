import React, { Component } from "react"
import { connect } from "react-redux"
import {
    Route,
    Switch,
    withRouter
  } from "react-router-dom"

import { ROUTES, SUBROUTES } from "../../../core/routes"

import ConsoleTabsComponents from "./components/ConsoleTabsComponents"
import AdminPage from "../../common/components/AdminPage"

//import "./styles/console-styles.css"


class ConsolePage extends AdminPage { 

    renderContent() {

        return (
            <Switch>

                <Route path={`${ ROUTES.CONSOLE }${ SUBROUTES.CONSOLE.PRODUCTS }/:productFilter?/:paginationFilter?`}>
                    <ConsoleTabsComponents mode = { SUBROUTES.CONSOLE.PRODUCTS } />
                </Route>
    
                <Route path={`${ ROUTES.CONSOLE }${ SUBROUTES.CONSOLE.USERS }/:paginationFilter?/:userFilter?`}>
                    <ConsoleTabsComponents mode = { SUBROUTES.CONSOLE.USERS } />
                </Route>

            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        meuserReducer: state.meuserReducer
    }
}

export default connect(mapStateToProps)(withRouter(ConsolePage))


