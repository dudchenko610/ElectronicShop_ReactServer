import React from "react"
import { connect } from "react-redux"

import FillingListComponent from "../../../../components/filling-list/FillingListComponent"
import ProductListItemComponent from "./ProductListItemComponent"


// paginationFilter
// productFilter
// onScrollToBottom

class ProductsListComponent extends FillingListComponent {

    constructor(props) {
        super(props)
        
    }

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

        // filter will be passed via props
        // <a onClick = {() => {this.props.getCategories()}}>Reload</a>
    }

    onReadyElement(element, index) {
        return <ProductListItemComponent 
                    key = {index}
                    productId = {element.id}/>
    }

}

function mapStateToProps(state) {

    return {
      //  isReverse: true
    }
}

export default connect(mapStateToProps)(ProductsListComponent)