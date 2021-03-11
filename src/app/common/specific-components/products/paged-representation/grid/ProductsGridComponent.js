import React, { Component }  from "react"
import { connect } from "react-redux"

import GridComponent from "../../../../components/grid/GridComponent"
import ProductGridItemComponent from "./ProductGridItemComponent"



// paginationFilter
// productFilter
// onScrollToBottom

class ProductsGridComponent extends GridComponent {

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
        return <ProductGridItemComponent 
                    key = {index}
                    productId = {element.id}/>
    }

}

function mapStateToProps(state) {

    return {
      //  isReverse: true
    }
}

export default connect(mapStateToProps)(ProductsGridComponent)