import React, { Component } from "react"
import { LOAD_STATES } from "../../../core/load-states"
import { ROUTES } from "../../../core/routes"

class AuthPage extends Component {

    componentDidMount() {
        if (this.props.meuserReducer.state === LOAD_STATES.NONE) {
            this.props.history.push(ROUTES.HOME)
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.meuserReducer.state === LOAD_STATES.LOADING) {
            return
        }

        if (!this.props.meuserReducer.isAuthenticated) {
            this.props.history.push(ROUTES.HOME)
        }
    }

    render() {
        if (this.props.meuserReducer.state !== LOAD_STATES.READY) {
            return <></>
        }

        return this.renderContent()
        
    }

}

export default AuthPage

