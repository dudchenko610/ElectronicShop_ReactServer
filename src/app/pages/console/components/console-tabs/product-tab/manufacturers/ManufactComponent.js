import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import ListComponent from "../../../../../../common/components/list-wrapper/ListComponent"
import InputPopupComponent from "../../../../../../common/components/popups/InputPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"
import {addManufacturerAction, getManufacturersAction} from "../../../../../../common/crud/manufacturers/actions/manufacturer-actions"

import ManufactItemComponent from "./ManufactItemComponent"

import "./styles/manufact-styles.css"

class ManufactComponent extends ListComponent {

    onNone() {
        return <p>Список производителей пуст !</p>
    }

    onEmptyList() {
        return <p>Список производителей пуст !</p>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label><br/>
                <a onClick = {() => {this.props.getManufacturers()}}>Reload</a>
            </>
        )
    }

    onReadyElement(element, index, array) {
        return <ManufactItemComponent 
                    key = {element} 
                    manufactId = {element}/>
    }


    render() {

        return (
            <div className = "manufacts-container">

                <div className="add-manufact-btn-container">

                    {
                        this.props.state === LOAD_STATES.READY  || this.props.state === LOAD_STATES.NONE ?
                        
                        <>
                            <a 
                                className="add-manufact-a" 
                                onClick={
                                    () => 
                                        this.props.showAlertPopupX
                                        (
                                            {
                                                width: 800,
                                                height: 450
                                            },
                                            <InputPopupComponent 
                                                okLabel = "Add Manufacturer"
                                                emptyMsg = "Manufacturer name cannot be empty!"
                                                onOk = {(manufactName) =>{
                                                    const category = {
                                                        name: manufactName
                                                    }
                                                    this.props.addManufacturer(category)
                                                }}/>
                                        )
                                }
                            >Add
                            </a>
                        </>

                        :
                        <span></span>
                    }

                    
                        
                    {
                        this.props.manufacturerReducer.addingNewState === LOAD_STATES.LOADING 

                        ? 
                            <ProgressBar sqSize= "16" phase = {Math.random() * 100} strokeWidth = "1"/> 
                        :
                            ""
                    }
                        
                </div>

                {
                    super.render()
                }

            </div>
        )
    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            // popup
            showAlertPopupX: showAlertPopupXAction,

            // manufacturers
            getManufacturers: getManufacturersAction,
            addManufacturer: addManufacturerAction,
        },
        dispatch
    )
}

function mapStateToProps(state) {

    let manufacturerIds = Array.from( state.manufacturerReducer.content.keys() );

    return {
        manufacturerReducer: state.manufacturerReducer,

        data: manufacturerIds,
        state: state.manufacturerReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(ManufactComponent)

