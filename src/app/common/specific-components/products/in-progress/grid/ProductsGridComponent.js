import React from "react"

import GridComponent from "../../../../components/grid/GridComponent"
import ProductGridItemComponent from "./ProductGridItemComponent"


class ProductsGridComponent extends GridComponent {


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
        return <ProductGridItemComponent 
                    key = {index}
                    product = {element}
                    state = { element.state }/>
    }

}



export default ProductsGridComponent