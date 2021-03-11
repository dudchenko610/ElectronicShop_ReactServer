import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import FillingListComponent from "../../../common/components/filling-list/FillingListComponent";
import { getListFromStorage } from "../../../../core/local-storage-handler";
import { LOAD_STATES } from "../../../../core/load-states";
import { ROUTES } from "../../../../core/routes";
import { removeOrderItemFromBasketAction } from "../../../common/crud/orders/actions/order-actions";

class OrderItemsFillingListComponent extends FillingListComponent {
    onReadyElement(orderItem, index) {
        return (
            <div>
                <Link className='product-name' to={ ROUTES.PRODUCT + "/" + orderItem.productId }>
                    <div> { orderItem.name }</div>
                </Link>


                <div> Price: { orderItem.price } </div>
                <div> Count: { orderItem.count } </div>

                <div
                    onClick = {
                        (e) => {
                            this.props.removeOrderItemFromBasket(index)
                        }
                    }
                >Remove</div>
                
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeOrderItemFromBasket: removeOrderItemFromBasketAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    const orderItemsList = getListFromStorage("orderItemsList")

    return {
        orderReducer: state.orderReducer,

        state: LOAD_STATES.READY,
        data: orderItemsList
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(OrderItemsFillingListComponent)