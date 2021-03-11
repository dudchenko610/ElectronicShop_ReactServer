import React, { Component } from "react"
import { connect } from "react-redux"

import CharCharValItemComponent from "./char-char-val/CharCharValItemComponent"

import "./styles/char-tab-styles.css"

// productId
class CharacteristicsTabComponent extends Component {

    render() {

        const productId = this.props.productId

        const product = productId 
            ? 
                this.props.productsReducer.inProgressContent.get(productId) 
            : 
                this.props.productsReducer.currentProduct

        return (
            <div className = "product-charact-tab" >
                {
                    product.n_N_Product_Characteristics.map((nn, index, array) => {

                        const charValue = nn.characteristicValue

                        return (
                            <div
                                key = { index }
                            >
                                <CharCharValItemComponent
                                    characteristicValueId = { charValue.id }
                                    characteristicId = { charValue.characteristicId }
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}



function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer
    }
}

export default connect(mapStateToProps)(CharacteristicsTabComponent)