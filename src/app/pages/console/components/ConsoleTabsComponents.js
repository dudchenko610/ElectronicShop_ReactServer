import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"


import { ROUTES, SUBROUTES } from "../../../../core/routes"

import TabsComponent from "../../../common/components/tab/TabsComponent"

import ProductsTabComponent from "./console-tabs/product-tab/ProductsTabComponent"
import UsersTabComponent from "./console-tabs/user-tab/UserTabComponent"

import { updateConsoleReducerAction } from "../actions/console-actions"

import "./styles/console-tabs-styles.css"


var qs = require('qs');

// mode
class ConsoleTabsComponent extends TabsComponent {

    constructor(props) {
        super(props)

    }

    onTabClicked(index) {

        if (index != this.state.prevActiveTabIndex) {

            const params = {}

            console.log(index)

            switch(index) {
                case 0:

                
                    if (this.props.productsReducer.productFilter && Object.entries(this.props.productsReducer.productFilter).length != 0  ) {
                        params.productFilter = qs.stringify(this.props.productsReducer.productFilter)
                    }
            
                    if (this.props.productsReducer.paginationFilter && Object.entries(this.props.productsReducer.paginationFilter).length != 0  ) {
                        params.paginationFilter = qs.stringify({pageNumber : this.props.productsReducer.paginationFilter.pageNumber})
                    }
            
                    
                    this.props.history.push(
                        { 
                            pathname: generatePath(
                                ROUTES.CONSOLE + SUBROUTES.CONSOLE.PRODUCTS + "/:productFilter?/:paginationFilter?", 
                                params
                            ) 
                        }
                    )
                    

                    break
                case 1:
                    
                    if (this.props.userDataReducer.userFilter && Object.entries(this.props.userDataReducer.userFilter).length != 0  ) {
                        params.userFilter = qs.stringify(this.props.userDataReducer.userFilter)
                    }
            
                    if (this.props.userDataReducer.paginationFilter && Object.entries(this.props.userDataReducer.paginationFilter).length != 0  ) {
                        params.paginationFilter = qs.stringify({pageNumber : this.props.userDataReducer.paginationFilter.pageNumber})
                    }
    
                    
                    this.props.history.push(
                        { 
                            pathname: generatePath(
                                ROUTES.CONSOLE + SUBROUTES.CONSOLE.USERS + "/:paginationFilter?/:userFilter?", 
                                params
                            ) 
                        }
                    )

                    break
            }
    
        }


    }

    componentDidMount() {

        console.log(this.props.mode)

        switch(this.props.mode) {
            case SUBROUTES.CONSOLE.PRODUCTS:
                this.openTab(0)
                break
            case SUBROUTES.CONSOLE.USERS:
                this.openTab(1)
                break
        }

        super.componentDidMount()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.mode !== this.props.mode) {
            //this.state.currentMode = this.props.mode 

            switch(this.props.mode) {
                case SUBROUTES.CONSOLE.PRODUCTS:
                    this.openTab(0)
                    break
                case SUBROUTES.CONSOLE.USERS:
                    this.openTab(1)
                    break
            }
        }
    }

    onTabContent(index) {
        switch(index) {
            case 0:
                return (
                    <div className = "console-tab-cntnt">
                        Products
                    </div>
                )
            case 1:
                return (
                    <div className = "console-tab-cntnt">
                        Users
                    </div>
                )
            default:
                return null
        }
    }

    onContent(index) {

        switch(index) {
            case 0:
                return (
                    <ProductsTabComponent
                        key = "0"
                    />
                )
            case 1:
                return (

                    <UsersTabComponent
                        key = "1"
                    />

                    
                )
            default:
                return null
        }
    }

}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            updateConsoleReducer: updateConsoleReducerAction,

        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        tabCount : 2,
        tabWidth: "20%",

        productsReducer : state.productsReducer,
        userDataReducer: state.userDataReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(ConsoleTabsComponent))
