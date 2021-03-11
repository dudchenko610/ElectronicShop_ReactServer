import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"

import { ROUTES, SUBROUTES } from "../../../../../../core/routes"
import { addPopStateListener, removePopStateListener } from "../../../../../../core/pop-history-events"

import { getUsersAction } from "../../../../user/actions/user-actions"

import UsersPagedComponent from "../../../../../common/specific-components/users/paged-representation/UsersPagedComponent"

import "./styles/user-styles.css"


const qs = require('qs')

class UsersTabComponent extends Component {


    constructor(props) {
        super(props)

        this.popHistoryCallback = () => {
            if (this.props.match.path.includes(SUBROUTES.CONSOLE.USERS)) {
                this.adjustDataWithPath()
            }
        }
    }

    adjustDataWithPath() {
        const paginationFilter = qs.parse( this.props.match.params.paginationFilter )
        const userFilter = qs.parse( this.props.match.params.userFilter )

        this.props.getUsers(paginationFilter, userFilter)
    }

    componentDidMount() {
        addPopStateListener(this.popHistoryCallback)

        this.adjustDataWithPath()
    }

    componentWillUnmount() {
        removePopStateListener(this.popHistoryCallback)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if ( this.props.match.path !== prevProps.match.path ) {

            if (this.props.match.path.includes(SUBROUTES.CONSOLE.USERS)) {
              //  this.adjustDataWithPath()
            }

        }
    }

    render () {
        return (
            <UsersPagedComponent/>
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
        userDataReducer: state.userDataReducer 
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(UsersTabComponent))