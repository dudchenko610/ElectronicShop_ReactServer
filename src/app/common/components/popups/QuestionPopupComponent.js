import React, {Component} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {hidePopupAction} from "../../actions/popup-actions"

class QuestionPopupComponent extends Component {

    render () {
        return (
            <div>
                <label>{this.props.notification}</label>
                <a onClick = {
                    () => {  
                            this.props.hidePopup()
                            this.props.onOk(this.props.feature)
                        }
                    }>{this.props.okLabel}</a>
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


export default connect(null, matchDispatchToProps)(QuestionPopupComponent)