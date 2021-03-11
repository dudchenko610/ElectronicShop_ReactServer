import React from "react"
import { LOAD_STATES } from "../../../../../../core/load-states"

import FillingListComponent from "../../../../components/filling-list/FillingListComponent"
import ProductListItemComponent from "./ProductListItemComponent"


class ProductsListComponent extends FillingListComponent {

    onNone() {
        return <p>Список продуктов пуст !</p>
    }

    onEmptyList() {
        return <p>Список продуктов пуст !</p>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label><br/>
            </>
        )
    }

    onReadyElement(element, index) {
        return <ProductListItemComponent 
                    key = {index}
                    product = { element }
                    state = { element.state }/>
    }

}


export default ProductsListComponent