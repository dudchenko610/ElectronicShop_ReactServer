import React, { Component } from "react"

import "./styles/product-sorting-styles.css"

// onChangeViewMode
class ProductSortingComponent extends Component {

  

    render() {

        return (
            <div className = "product-sorting">
                

                <div>
                    <div
                        style = {
                            !this.props.isInGridMode ?  { border : "1px solid red" } : {}
                        }

                        onClick = {
                            (e) => {
                                this.props.onChangeViewMode(false)
                            }
                        }
                    >list</div>

                    <div

                        style = {
                            this.props.isInGridMode ? { border : "1px solid red" } : {}
                        }

                        onClick = {
                            (e) => {
                                this.props.onChangeViewMode(true)
                            }
                        }
                    >grid</div>
                </div>

            </div>
        )
    }

}


export default ProductSortingComponent