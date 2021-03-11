import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"


import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"
import QuestionPopupComponent from "../../../../../../common/components/popups/QuestionPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"

import { updateCharacteristicAction, removeCharacteristicAction} from "../../../../../../common/crud/characteristics/actions/characteristic-actions"
import { addCharacteristicValueAction } from "../../../../../../common/crud/characteristic-values/actions/characteristic-value-actions"


import "./styles/char-item-styles.css"

class CharItemComponent extends Component {


    render() {

        const characteristic = this.props.characteristicReducer.content.get(this.props.charId)

        return (
            <div className = "characteristic-item">

                <label className = "name">{characteristic.name}</label>

                <div className = "actions">
               
                    {
                        this.props.isExpanded ? <label className = "expanded">+</label> : ""
                    }

                    {
                        characteristic.state === LOAD_STATES.LOADING ?
                            <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/> :
                            
                            <>
                                <a 
                                    className = "add" 
                                    onClick = {
                                        (event) => { 
                                            event.stopPropagation()

                                            this.props.showAlertPopupX
                                            (
                                                {width: 300, height: 250},
                                                <InputPopupComponent 
                                                    okLabel = "Add Value Characteristic"
                                                    emptyMsg = "Characteristic Value name cannot be empty!"
                                                    onOk = {(characteristicValueName) => {

                                                        const newCharVal = {
                                                            name : characteristicValueName
                                                        }

                                                        this.props.addCharacteristicValue(newCharVal, characteristic)
                                                    }}/>
                                            ) 
                                        }
                                    }
                                >ADD</a>

                                <a 
                                    className = "update" 
                                    onClick = {
                                        (event) => { 
                                            event.stopPropagation()

                                            this.props.showAlertPopupX
                                            (
                                                {width: 300, height: 250},
                                                <InputPopupComponent 
                                                    okLabel = "Save Characteristic"
                                                    emptyMsg = "Characteristic name cannot be empty!"
                                                    initialText = {characteristic.name}
                                                    onOk = {(characteristicName) => {

                                                        const newChar = {
                                                            name : characteristicName
                                                        }

                                                        this.props.updateCharacteristic(characteristic, newChar)
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
                                                    okLabel = "Delete Characteristic"
                                                    notification = "This action deletes some related data, are you sure?"
                                                    feature = {characteristic}
                                                    onOk = {(feature) => {
                                                        this.props.removeCharacteristic(characteristic)
                                                    }}
                                                />
                                            ) 

                                        }
                                    }
                                >DEL</a>
                            
                            </>
                    }


                    
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
            updateCharacteristic: updateCharacteristicAction,
            removeCharacteristic: removeCharacteristicAction,

            addCharacteristicValue: addCharacteristicValueAction
            
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        characteristicReducer: state.characteristicReducer,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CharItemComponent)

