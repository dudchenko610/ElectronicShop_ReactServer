import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { getUsersAction } from "../user/actions/user-actions"
import { withRouter } from "react-router-dom"

import UsersPagedComponent from "../../common/specific-components/users/paged-representation/UsersPagedComponent"
import AuthPage from "../../common/components/AuthPage"

import "./styles/users-page-styles.css"

const qs = require('qs')

class UsersPage extends AuthPage {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {

        super.componentDidMount()

        if (this.props.meuserReducer.isAuthenticated) {
            const paginationFilter = qs.parse( this.props.match.params.paginationFilter )
            const userFilter = qs.parse( this.props.match.params.userFilter )

            this.props.getUsers(paginationFilter, userFilter)

            this.setState({isLoaded: true})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    
        if (this.props.meuserReducer.isAuthenticated) {
            if (!this.state.isLoaded) {

                const paginationFilter = qs.parse( this.props.match.params.paginationFilter )
                const userFilter = qs.parse( this.props.match.params.userFilter )

                this.props.getUsers(paginationFilter, userFilter)

                this.setState({isLoaded: true})

            }
        }

        super.componentDidUpdate(prevProps, prevState, snapshot)
        
    }

    renderContent() {

        console.log("renderContent")


        return (
            <div className = "users-page-container">
                <UsersPagedComponent/>
            </div>
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
        meuserReducer: state.meuserReducer,
        userDataReducer: state.userDataReducer,

        state: state.userDataReducer.stateCurrent,
        user: state.userDataReducer.currentUser
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(UsersPage))