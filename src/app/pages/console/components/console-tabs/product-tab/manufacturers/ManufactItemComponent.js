import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"


import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"
import QuestionPopupComponent from "../../../../../../common/components/popups/QuestionPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"
import {updateManufacturerAction, removeManufacturerAction} from "../../../../../../common/crud/manufacturers/actions/manufacturer-actions"


import "./styles/manufact-item-styles.css"

class ManufactItemComponent extends Component {


    render() {

        const manufacturer = this.props.manufacturerReducer.content.get(this.props.manufactId)
        
        return (
            <div className = "manufact-item" >

                <label className = "name">{manufacturer.name}</label>

                <div className = "actions">
               
                    {
                        manufacturer.state === LOAD_STATES.LOADING ?
                            <ProgressBar sqSize= "12" phase = {Math.random() * 100} strokeWidth = "1"/> :
                            <>
                                <a 
                                    className = "update" 
                                    onClick = {
                                        (event) => { 
                                            event.stopPropagation()

                                            this.props.showAlertPopupX
                                            (
                                                {width: 300, height: 250},
                                                <InputPopupComponent 
                                                    okLabel = "Save Manufacturer"
                                                    initialText = {manufacturer.name}
                                                    emptyMsg = "Manufacturer name cannot be empty!"
                                                    onOk = {(manufactName) => {

                                                        const newManufact = {
                                                            name : manufactName
                                                        }

                                                        this.props.updateManufacturer(manufacturer, newManufact)
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
                                                    okLabel = "Delete Manufacturer"
                                                    notification = "This action deletes some related data, are you sure?"
                                                    feature = {manufacturer}
                                                    onOk = {(feature) => {
                                                        this.props.removeManufacturer(manufacturer)
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
            removeManufacturer: removeManufacturerAction,
            updateManufacturer: updateManufacturerAction,
            
            showAlertPopupX: showAlertPopupXAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    return {
        manufacturerReducer: state.manufacturerReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ManufactItemComponent)

