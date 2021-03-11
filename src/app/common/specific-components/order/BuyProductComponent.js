import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import TypeCountComponent from "./TypeCountComponent"
import { addOrderItemToBasketAction } from "../../crud/orders/actions/order-actions"
import { withRouter } from "react-router"
import { ROUTES } from "../../../../core/routes"

// product
// user
// onOk

class BuyProductComponent extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            editable: {
                count: 1
            }
        }
    }

    render () {
        return (
            <div>
                <TypeCountComponent 
                    editable = { { count: "1" } }
                    onEdit = {
                        (editable) => {

                            this.state.editable = {
                                ...this.state.editable,
                                ...editable,
                                count : parseInt(editable.count)
                            }
                        }
                    }

                />
                <div
                    onClick = {
                        (e) => {
                            this.props.addOrderItemToBasket(this.props.product, this.state.editable.count)
                            this.props.history.push(ROUTES.BASKET)

                            if (this.props.onOk) {
                                this.props.onOk()
                            }
                        }
                    }
                >Add to basket</div>
            </div>
        )
    }

}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addOrderItemToBasket: addOrderItemToBasketAction 
        },
        dispatch
    )
}

/*
function mapStateToProps(state) {
    return {
    }
}  
*/

export default connect(null, matchDispatchToProps)(withRouter(BuyProductComponent))