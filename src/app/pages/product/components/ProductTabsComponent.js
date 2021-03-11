import React from "react"
import { connect } from "react-redux"
import TabsAdjustableComponent from "../../../common/components/tab-adjustable/TabsAdjustableComponent"


import CharacteristicsTabComponent from "./product-tabs/characteristics-tab/CharacteristicsTabComponent"
import CommentsTabComponent from "./product-tabs/comments-tab/CommentsTabComponent"

import "./styles/product-tabs-styles.css"

//onTabClicked
class ProductTabsComponent extends TabsAdjustableComponent {

    onTabClicked(index) {
        super.onTabClicked(index)

        if (this.props.onTabClicked) {
            this.props.onTabClicked(index)
        }
    }

    onTabContent(index) {
        switch(index) {
            case 0:
                return (
                    <div className = "tab-cntnt">
                        Characteristics
                    </div>
                )
            case 1:
                return (
                    <div className = "tab-cntnt">
                        Comments
                    </div>
                )
            default:
                return null
        }
    }

    onContent(index) {
        

        switch(index) {
            case 0:
                return (
                    <div
                        key = "0" 
                        ref = {this.state.tabsContent[0].tabRef}
                    >
                        <CharacteristicsTabComponent />
                    </div>
                    
                )
            case 1:
                return (

                    <div
                        key = "1" 
                        ref = {this.state.tabsContent[1].tabRef}
                    >
                        <CommentsTabComponent
                            productId = { this.props.productId }
                            onUpdate = {
                                () => {
                                    this.recalculateCurrentTabHeight()
                                }
                            }
                        />
                    </div>

                   
                )
            default:
                return null
        }
    }

}


function mapStateToProps(state) {

    return {
        productsReducer: state.productsReducer,
        tabCount : 2,
        tabWidth: "20%",
        adjustTabHeight: true
    }
}

export default connect(mapStateToProps)(ProductTabsComponent)


