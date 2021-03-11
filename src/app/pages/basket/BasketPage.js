import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import ListComponent from "../../common/components/list-wrapper/ListComponent"

import { LOAD_STATES } from "../../../core/load-states"
import OrderItemsFillingListComponent from "./components/OrderItemsFillingListComponent"
import { getListFromStorage } from "../../../core/local-storage-handler"
import { ROUTES } from "../../../core/routes"



class BasketPage extends ListComponent {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.meuserReducer.state === LOAD_STATES.READY && this.props.meuserReducer.isAdmin)) {
            this.props.history.push(ROUTES.HOME)
        }

     //   super.componentDidUpdate(prevProps, prevState, snapshot)
    }

    componentDidMount() {
        if ((this.props.meuserReducer.state === LOAD_STATES.READY && this.props.meuserReducer.isAdmin)) {
            this.props.history.push(ROUTES.HOME)
        }
    }



    render() {

        console.log(this.props.meuserReducer.state)

        if (this.props.meuserReducer.state !== LOAD_STATES.READY) {

            if (this.props.meuserReducer.state === LOAD_STATES.NONE) {
                return super.render()
            }

            return <div></div>
        }
        return super.render()
    }

    onReadyElement(element, index, array) {


        return (
            <div>
                
                <OrderItemsFillingListComponent />

                <div>Оформить заказ</div>


            </div>
        )
    }


}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            
        },
        dispatch
    )
}

function mapStateToProps(state) {

    const orderItemsList = getListFromStorage("orderItemsList")
    const listState = orderItemsList.length == 0 ? LOAD_STATES.NONE : LOAD_STATES.READY

   
    return {
        meuserReducer: state.meuserReducer,

        state: listState,
        data: [ {} ]
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(BasketPage))