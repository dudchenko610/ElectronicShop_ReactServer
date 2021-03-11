import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { generatePath } from "react-router"

import {LOAD_STATES} from "../../../../../core/load-states"

import ListComponent from "../../../components/list-wrapper/ListComponent"
import UsersListComponent from "./list/UsersListComponent"

import PageSwitchSliderComponent from "../../sliders/page-switch-slider/PageSwitchSliderComponent"
import UserSortingComponent from "./UserSortingComponent"

import { getUsersAction } from "../../../../pages/user/actions/user-actions"

import "./styles/user-paged-styles.css"

var qs = require('qs')

class UsersPagedComponent extends ListComponent {

    constructor(props){
        super(props)

        this.state = {
            ...this.state
        }

    }

    onReadyElement(element, index, array) {

       
        
        switch(index) {
            case 0:
                return (
                    <UserSortingComponent
                        key = { index }
                    />
                )
            case 1:

                const users = []
                this.props.userDataReducer.content.forEach((user, index) => {
                    users.push(user)
                })

                return (
                    <UsersListComponent
                        data = { users }
                        state = { LOAD_STATES.READY }
                        key = { index }
                    />
                )
                
            case 2:
                
                if (!this.props.userDataReducer.paginationFilter || this.props.userDataReducer.paginationFilter.totalPages < 2) {
                    return <div key = { index } ></div>
                }

                return (
                    <div 
                        className = "center-notification-pb-txt" 
                        style = {{ width: "100%", height: "auto"}}
                        key = { index }
                    >
                        <div style = {{ width: "50%"}}>
                            <PageSwitchSliderComponent
                                currentNumber = { this.props.userDataReducer.paginationFilter.pageNumber }
                                pageCount = { this.props.userDataReducer.paginationFilter.totalPages }
                                

                                onPageChoosen = {
                                    (pageNumber) => {
                                     //   console.log("pageNumber = " + pageNumber)

                                        const paginationFilter = {
                                            ...this.props.userDataReducer.paginationFilter,
                                            pageNumber: pageNumber
                                        }

                                       
                                        this.scrollView.scrollIntoView({ block: "start", inline: "nearest" })


                                        this.props.getUsers(paginationFilter, this.props.userDataReducer.userFilter)

                                        const params = {}

                                        if (this.props.userDataReducer.userFilter && Object.entries(this.props.userDataReducer.userFilter).length != 0  ) {
                                            params.userFilter = qs.stringify(this.props.userDataReducer.userFilter)
                                        }
                                        params.paginationFilter = qs.stringify({pageNumber : paginationFilter.pageNumber})
                                        

                                        this.props.history.push({
                                            pathname: generatePath(this.props.match.path,  params)
                                        })

                                    }
                                }

                            />
                        </div>
                    </div>
                    
                )
            default:
                return null
        }
    }

    onNone() {
        return <label>There no users</label>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label>
                <a
                    onClick = {
                        (event) => {
                            this.props.getUsers(this.props.userDataReducer.paginationFilter, this.props.userDataReducer.userFilter)
                        }
                    } 
                >Repeat</a>
            </>
        )
        
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getUsers: getUsersAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        userDataReducer: state.userDataReducer,
        state: state.userDataReducer.state,
     //   state: LOAD_STATES.READY,


        data: [ {attr: "sorting"},  {attr: "users"}, {attr: "switcher"}],
        
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(UsersPagedComponent))
