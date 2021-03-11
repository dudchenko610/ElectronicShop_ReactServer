import React, {Component} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import {hidePopupAction} from "../../actions/popup-actions"

class InputPopupComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            errorMessage: ""
        }

    }


    handleChangeUser = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    [name] : value
                }
            }
        )

    }

    setEmptyMsg = (errorMsg) => {
        this.setState
        (
            function (state, props) {
                return {
                    ...state,
                    errorMessage : errorMsg
                }
            }
        )
    }

    componentDidMount() {
        if (this.props.initialText) {
            this.setState
            (
                function (state, props) {
                    return {
                        ...state,
                        name : this.props.initialText
                    }
                }
            )
        }
    }

    render () {
        return (
            <div>
    
                {this.state.errorMessage}
    
                <input 
                    name="name" 
                    type="text" 
                    onChange={
                        event => {
                            if (this.state.errorMessage !== "" && event.target.value !== "") {
                                this.setEmptyMsg(null)
                            }

                            this.handleChangeUser(event)
                        }
                    } 
                    defaultValue={this.props.initialText || ''}
                   // value = {this.props.initialText}
                />
                
                <a 
                    onClick={(event) => 
                    {
    
                        if (this.state.name === "") {
                            this.setEmptyMsg(this.props.emptyMsg)
                            return
                        }
    
                        this.props.hidePopup()

                        this.props.onOk(this.state.name)
    
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


export default connect(null, matchDispatchToProps)(InputPopupComponent)