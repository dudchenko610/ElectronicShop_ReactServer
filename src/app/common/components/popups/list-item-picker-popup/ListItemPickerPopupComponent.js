import React, { Component } from "react"

import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {hidePopupAction} from "../../../actions/popup-actions"

import "./styles/list-item-picker-styles.css"

// pickLabel
// onPicked
// onElementStyle(element, index)
// onItemReady(element, index)
// thizJSX

class ListItemPickerPopupComponent extends Component {
    
    constructor(props) {
        super(props)

      /*  this.state = {
            data : []
        }

        for (var i = 0; i < 100; i ++) {
            this.state.data.push(i)
        }*/
    }


    /*onItemReady(element, index) {
        return (
            <div>{element} = {index}</div>
        )
    }*/

    render() {

        return (
            <div className = "popup-container">
                <div className="values-scrollbar" id="style-list">

                    <label>{this.props.pickLabel}</label>

                    <ol className="inner-list-values" ref={ref => (this.scrollView = ref)}>
                        {
                            this.props.data.map((element, index, array) => {

                                return (
                                    <div 
                                        style = 
                                        {
                                            this.props.onElementStyle(element, index)
                                        } 

                                        onClick = 
                                        {
                                            event => {
                                                this.props.onPicked(element, index)
                                                this.props.hidePopup(this.props.thizJSX.popupJSX)
                                            }
                                        }
                                        key = {index}
                                    >
                                        { this.props.onItemReady(element, index) }
                                        
                                    </div>
                                )
                            })
                        }
                    </ol>

                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction,
        },
        dispatch
    )
}


export default connect(null, matchDispatchToProps)(ListItemPickerPopupComponent)