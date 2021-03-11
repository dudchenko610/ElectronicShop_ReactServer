import React from "react"
import { connect } from "react-redux"

import TabsAdjustableComponent from "./tabs/TabsAdjustableComponent"

import "./styles/tabs-realization-styles.css"

class TabsRealizationComponent extends TabsAdjustableComponent {

    onTabClicked(index) {
        super.onTabClicked(index)
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
            {
                const arr = []

                for (var i = 0; i < 35; i ++) {
                    arr.push(i)
                }


                return (

                    <div
                        key = "0" 
                        ref = {this.state.tabsContent[0].tabRef}


                    >
                        {
                            arr.map((el, index, array) => {
                                return (
                                    <div key = {index}>{"____" +  index }</div>
                                )
                            }) 
                        }
                    </div>

                   
                )
            }
                
            case 1:
            {

                const arr = []

                for (var i = 0; i < 120; i ++) {
                    arr.push(i)
                }


                return (

                    <div
                        key = "1" 
                        ref = {this.state.tabsContent[1].tabRef}


                    >
                        {
                            arr.map((el, index, array) => {
                                return (
                                    <div key = {index}>{ index }</div>
                                )
                            }) 
                        }
                    </div>

                   
                )
            }
                
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

export default connect(mapStateToProps)(TabsRealizationComponent)


