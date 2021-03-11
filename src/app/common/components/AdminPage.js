import React, {Component} from "react"
import { LOAD_STATES } from "../../../core/load-states"
import { ROUTES } from "../../../core/routes"

class AdminPage extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.meuserReducer.state === LOAD_STATES.READY && !this.props.meuserReducer.isAdmin) ||
            this.props.meuserReducer.state === LOAD_STATES.NONE) {
            this.props.history.push(ROUTES.HOME)
        }
    }

    render() {
        if (this.props.meuserReducer.state !== LOAD_STATES.READY) {
            return <div></div>
        }
        return this.renderContent()
    }
    
}

export default AdminPage



