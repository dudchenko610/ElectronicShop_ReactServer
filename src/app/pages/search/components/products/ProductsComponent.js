import React, {Component} from "react"

import ProductsGridComponent from "../../../../common/components/lists/product-list/ProductsGridComponent"



import "./styles/product-styles.css"

class ProductsComponent extends Component {
    render() {
        return (
            <div className = "search-product-component">
                <ProductsGridComponent />


            </div>
        )
    }
}

export default ProductsComponent


