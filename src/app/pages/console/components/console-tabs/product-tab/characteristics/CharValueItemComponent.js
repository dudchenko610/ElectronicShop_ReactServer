import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"
import QuestionPopupComponent from "../../../../../../common/components/popups/QuestionPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"

import { removeCharacteristicValueAction, updateCharacteristicValueAction } from "../../../../../../common/crud/characteristic-values/actions/characteristic-value-actions"

import "./styles/char-value-item-styles.css"

class CharValueItemComponent extends Component {


    render() {

        
        return (
            <div className = "characteristic-value-item">

                <label className = "name">{this.props.charValue.name}</label>

                <div className = "actions">
               

                    {
                        this.props.charValue.state === LOAD_STATES.LOADING ?
                            <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/> :
                            ""
                    }


                    <a 
                        className = "update" 
                        onClick = {
                            (event) => { 
                                event.stopPropagation()

                                this.props.showAlertPopupX
                                (
                                    {width: 300, height: 250},
                                    <InputPopupComponent 
                                        okLabel = "Save Characteristic Value"
                                        emptyMsg = "Characteristic Value name cannot be empty!"
                                        initialText = {this.props.charValue.name}
                                        onOk = {(charValName) => {

                                            const newCharValue = {
                                                name : charValName
                                            }

                                            this.props.updateCharacteristicValue(this.props.charValue, newCharValue)
                                        }}/>
                                ) 
                            }
                        }
                    >UPD</a>
                    
                    <a 
                        className = "delete" 
                        onClick = 
                        {
                            (event) => { 
                                event.stopPropagation()
                                this.props.showAlertPopupX
                                (
                                    {width: 300, height: 250},
                                    <QuestionPopupComponent
                                        okLabel = "Delete Characteristic Value"
                                        notification = "This action deletes some related data, are you sure?"
                                        onOk = {(feature) => {
                                            this.props.removeCharacteristicValue(this.props.charValue, this.props.characteristic)
                                        }}
                                    />
                                ) 

                            }
                        }
                    >DEL</a>

                </div>
                
            </div>
        )
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // popup
            showAlertPopupX: showAlertPopupXAction,

            //
            updateCharacteristicValue: updateCharacteristicValueAction,
            removeCharacteristicValue: removeCharacteristicValueAction
            
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        characteristicReducer: state.characteristicReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CharValueItemComponent)


