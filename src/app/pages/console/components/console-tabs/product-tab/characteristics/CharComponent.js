import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { LOAD_STATES } from "../../../../../../../core/load-states"

import ProgressBar from "../../../../../../common/components/ProgressBar"

import DoubleListComponent, {matchDispatchToPropsDoubleList, mapStateToPropsDoubleList} from "../../../../../../common/components/double-list-wrapper/DoubleListComponent"
import MultipleInputPopupComponent from "../../../../../../common/components/popups/multiple-input-popup/MultipleInputPopupComponent"

import {showAlertPopupXAction} from "../../../../../../common/actions/popup-actions"
import {addCharacteristicAction, getCharacteristicsAction} from "../../../../../../common/crud/characteristics/actions/characteristic-actions"


import CharItemComponent from "./CharItemComponent"
import CharValueItemComponent from "./CharValueItemComponent"



import "./styles/char-styles.css"

class CharComponent extends DoubleListComponent {

    static counter = 0

    onNone() {
        return <p>Список характеристик пуст !</p>
    }

    onEmptyList() {
        return <p>Список характеристик пуст !</p>
    }

    onFailed() {
        return (
            <>
                <label>Failed</label><br/>
                <a onClick = {() => {this.props.getCharacteristics()}}>Reload</a>
            </>
        )
    }

    onPrepareLowerElements(upperElement) {
        const characteristic = this.props.characteristicReducer.content.get(upperElement)
        return characteristic.characteristicValues
    }

    onReadyUpperElement(element, index, array, isExpanded) {
        return (
            <CharItemComponent 
                key = {CharComponent.counter ++}
                charId = {element}
                isExpanded = {isExpanded}
            />
        )
    }

    onReadyLowerElement(element, upperElement, index, array) {
        const characteristic = this.props.characteristicReducer.content.get(upperElement)

        return (
            <CharValueItemComponent 
                key = {CharComponent.counter ++}
                charValue = {element}
                characteristic = {characteristic}
              //  key = {index}
            />
        )
    }


    render() {

        return (
            <div className = "characteristics-container">

                {
                    this.props.consoleReducer.currentCategory ? 
                        <>
                            <div className="add-characteristic-btn-container">

                                {
                                    this.props.state === LOAD_STATES.READY || this.props.state === LOAD_STATES.NONE ? 

                                        <a 
                                            className="add-characteristic-a" 
                                            onClick={
                                                () => 
                                                    this.props.showAlertPopupX
                                                    (
                                                        {
                                                            width: 400,
                                                            height: 450
                                                        },

                                                        <MultipleInputPopupComponent 
                                                            okLabel = "Add Characteristic"
                                                            headerErrorLabel = "Error"
                                                            itemErrorLabel = "Error"
                                                            onOk = {(headerName, values) => {

                                                                console.log("MultipleInputPopupComponent onOk")

                                                                console.log(headerName)
                                                                console.log(values)

                                                                const charValues = []

                                                                values.map((element, index, array)=> {
                                                                    charValues.push({
                                                                        name: element
                                                                    })
                                                                })

                                                                const characteristic = {
                                                                    name: headerName,
                                                                    categoryId : this.props.consoleReducer.currentCategory.id,
                                                                    characteristicValues : charValues
                                                                }

                                                                this.props.addCharacteristic(characteristic)

                                                            }}
                                                        />

                                                      /*  <InputPopupComponent 
                                                            okLabel = "Add Characteristic"
                                                            emptyMsg = "Characteristic name cannot be empty!"
                                                            onOk = {(characteristicName) =>
                                                                {
                                                                const characteristic = {
                                                                    name: characteristicName,
                                                                    categoryId : this.props.consoleReducer.currentCategory.id
                                                                }

                                                                this.props.addCharacteristic(characteristic)
                                                            }}/>*/
                                                    )
                                            }
                                        >Add
                                        </a>

                                    :

                                    <span></span>

                                }
                                    
                                {
                                    this.props.characteristicReducer.addingNewState === LOAD_STATES.LOADING 

                                    ? 
                                        <ProgressBar sqSize= "16" phase = {Math.random() * 100} strokeWidth = "1"/> 
                                    :
                                        ""
                                }
                                    
                            </div>

                            {
                                super.render()
                            }

                        </>
                    :
                        <div className = "center-notification-pb-txt">
                            <label>Choose category!</label>
                        </div>        
                }

            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            ...matchDispatchToPropsDoubleList(),

            showAlertPopupX : showAlertPopupXAction,

            addCharacteristic: addCharacteristicAction,
            getCharacteristics: getCharacteristicsAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    const characteristicIds = [] // Array.from( state.characteristicReducer.content.keys() )
    const currentCategory = state.consoleReducer.currentCategory

    if (currentCategory) {
        state.characteristicReducer.content.forEach((char, key)=> {
            if (currentCategory.id === char.categoryId) {
                characteristicIds.push(char.id)
            }
        })
    }

    return {
        ...mapStateToPropsDoubleList(state),

        characteristicReducer: state.characteristicReducer,
        consoleReducer: state.consoleReducer,


        dataUpper: characteristicIds,
        state: state.characteristicReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CharComponent)


