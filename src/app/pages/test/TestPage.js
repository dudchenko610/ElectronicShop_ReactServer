import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import ListComponent from "../../common/components/list-wrapper/ListComponent"
import TabsRealizationComponent from "./components/TabsRealizationComponent"

import { LOAD_STATES } from "../../../core/load-states"
import ExpandableComponent from "../../common/components/expandable/ExpandableComponent"



class TestPage extends ListComponent {

    onReadyElement(element, index, array) {

        const arr = []

        for (var i = 0; i < 30; i ++) {
            arr.push(i)
        }

        return (
            <div>
                Test page

                <ExpandableComponent 
                
                    buttonLabel = { "Expand" } 
                    isExpanded = { false }
                    contentJSX = {
                        <>
                            {
                                arr.map((el, index, array) => {
                                    return (
                                        <div key = {index}>{ index }</div>
                                    )
                                }) 
                            }
                        </>
                    }
                />


                <TabsRealizationComponent />


            </div>
        )
    }


}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        state: LOAD_STATES.READY,
        data: [ {} ]
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(withRouter(TestPage))