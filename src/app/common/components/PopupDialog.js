import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { POPUP_ACTION_TYPES } from "../actions/popup-actions"
import { hidePopupAction } from "../actions/popup-actions"

import "../styles/popup-styles.css"

class PopupDialog extends Component {

    constructor(props) {
        super(props)

        this.popupRef = React.createRef()
        this.flag = false
    }

    render() {

        const popupReducer = this.props.popupReducer

        if (popupReducer.messages.length == 0) {
            return (
                <>
                </>
            )
        }

        const lastMessage = popupReducer.messages[popupReducer.messages.length - 1]

        var popupData = <div></div>

        switch (lastMessage.popupState) {

            case POPUP_ACTION_TYPES.POPUP_WAITING:
                popupData = <div>Popup Waiting</div>
                break
            case POPUP_ACTION_TYPES.POPUP_ALERT:
                popupData = (<div></div>)
                break
            case POPUP_ACTION_TYPES.POPUP_ALERT_X:
                popupData = (
                                <div>
                                    <div></div>
                                    <button  className="close-popup-btn" onClick={() => this.props.hidePopup(lastMessage.popupDiv)}>X</button>
                                </div> 
                            )
                break
            default:
                popupData = <label>There is no such popup</label>

        }

        const popStyleLM = lastMessage.popupStyle

        let style

        if (popStyleLM.inPercents) {
            style = {
                width: lastMessage.popupStyle.width + "%",
                height: lastMessage.popupStyle.height + "%",

                left: ( (100 - lastMessage.popupStyle.width) / 2) + "%",
                top:  ( (100 -lastMessage.popupStyle.height) / 2) + "%"
            }
        } else {
            style = {
                width: lastMessage.popupStyle.width + "px",
                height: lastMessage.popupStyle.height + "px",

                marginLeft: -(lastMessage.popupStyle.width / 2) + "px",
                marginTop: -(lastMessage.popupStyle.height / 2) + "px"
            }
        }

        return (

            <div 
                className="popup"
                ref = { this.popupRef }
            >
                <div className="popup-content" style = { style }>
                    <div className = "popup-content-wrapper">
                        {popupData}
                   
                        {lastMessage.popupDiv}
                    </div>

                </div>
            </div>



        )
    }
}

function mapStateToProps(state) {
    return {
        popupReducer: state.popupReducer
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            hidePopup: hidePopupAction
        },
        dispatch
    )
}


export default connect(mapStateToProps, matchDispatchToProps)(PopupDialog) 
