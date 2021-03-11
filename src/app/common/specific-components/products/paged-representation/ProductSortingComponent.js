import React from "react"

import EditComponent from "../../../components/edit/EditComponent"
import ProductPriceOrderSelectComponent from "../../selects/product-price-order-select/ProductPriceOrderSelectComponent"

import "./styles/product-sorting-styles.css"

// onChangeViewMode
class ProductSortingComponent extends EditComponent {

    constructor(props) {
        super(props)

        //this.state.editable.nameFilter = ""
      //  this.state.isInGridMode = true
    }

    onEdit(editable) {
        this.props.onEdit(editable)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {

        if (!this.props.editable) {
            return <></>
        }

/**<div>
                    <span>Product subname:</span>
                    <input name="nameFilter" type="text" value={this.props.editable.nameFilter || ''}  onChange={this.handleChange} />
                </div> */

        return (
            <div className = "product-sorting">
                

                <div>
                    <div
                        style = {
                            !this.props.isInGridMode ? 

                            {
                                border : "1px solid red"
                            } 

                            :

                            {}
                        }

                        onClick = {
                            (e) => {
                                this.props.onChangeViewMode(false)
                            }
                        }
                    >list</div>

                    <div

                        style = {
                            this.props.isInGridMode ? 

                            {
                                border : "1px solid red"
                            } 

                            :

                            {}
                        }

                        onClick = {
                            (e) => {
                                this.props.onChangeViewMode(true)
                            }
                        }
                    >grid</div>
                </div>

                <ProductPriceOrderSelectComponent
                     onSelected = {
                         (objVal) => {
                             
                         }
                     }

                />

            </div>
        )
    }

}


export default ProductSortingComponent