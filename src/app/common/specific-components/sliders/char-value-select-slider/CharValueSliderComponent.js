import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import AddableSliderComponent from "../addable-slider/AddableSliderComponent"
import CharValueSelectComponent from "../../selects/char-value-select/CharValueSelectComponent"
import ListItemPickerPopupComponent from "../../../components/popups/list-item-picker-popup/ListItemPickerPopupComponent"

import {LOAD_STATES} from "../../../../../core/load-states"

import { showAlertPopupXAction } from "../../../actions/popup-actions"

import { removeByValue } from "../../../../../core/array-methods"

import "./styles/char-value-slider-styles.css"

// data - characteristic ids
// onCharValuesSelected

class CharValueSliderComponent extends AddableSliderComponent {

    constructor(props) {
        super(props)

        
        this.state = {
            ...this.state,

            data: [],
            state : LOAD_STATES.READY,
            availableChars : [],
            gotCharacteristics : false,

            choosenValues : new Map()
            
        }

        this.showAddButton()
    }

    
    componentDidUpdate() {

        if (this.props.characteristicReducer.state !== LOAD_STATES.READY || this.state.gotCharacteristics) {
            return
        }

        const characteristicIds = []

        //console.log(this.props.categoryId)
        //console.log("__________________")
        //console.log(this.props.characteristicReducer.content)
    
        this.props.characteristicReducer.content.forEach((char, key)=> {
    
            if (this.props.categoryId == char.categoryId &&
                char.characteristicValues && 
                char.characteristicValues.length != 0) {
    
                    characteristicIds.push(char.id)
            }
        })
        
        //console.log(characteristicIds)

        this.state.availableChars = characteristicIds
        this.state.gotCharacteristics = true


        // extract ffrom product if it is

        const product = this.props.product

        if (!product) {
            return
        }

        console.log(product)

        product.n_N_Product_Characteristics.map((nn, index, array) => {

            const characteristicId = nn.characteristicValue.characteristicId

            this.hideAddButton()
            this.state.data.push(characteristicId)
            
         //   const characteristic = this.props.characteristicReducer.content.get(characteristicId)
            
            this.state.choosenValues.set( characteristicId, nn.characteristicValueId )

            removeByValue(this.state.availableChars, characteristicId)

            if (this.state.availableChars.length > 0) {
                this.showAddButton()
            }
        })

        this.props.onCharValuesSelected(this.state.choosenValues)
        this.updateComponent()

    }
    

    onAddCharacteristic(characteristicId) {
        this.hideAddButton()
        this.state.data.push(characteristicId)
        
        const characteristic = this.props.characteristicReducer.content.get(characteristicId)
        
        this.state.choosenValues.set( characteristicId, characteristic.characteristicValues[0].id )

        removeByValue(this.state.availableChars, characteristicId)

        if (this.state.availableChars.length > 0) {
            this.showAddButton()
        }

        this.setAnimation("")
        this.handleClickRight()

        this.updateComponent()

        this.props.onCharValuesSelected(this.state.choosenValues)
    }

    onAddClicked(element, index) {

        const obj = {}

        const popupJSX = (
            <ListItemPickerPopupComponent
                pickLabel = "Choose characteristic"
                thizJSX = {obj}

                data = {this.state.availableChars}

                onElementStyle = 
                    {
                        (element, index) => {
                            return {

                            }
                        }
                    }

                onItemReady = 
                    {
                        (element, index) => {

                            const characteristic = this.props.characteristicReducer.content.get(element)

                            return (
                                <div>
                                    {characteristic.name}
                                </div>
                            )
                        }
                    }

                onPicked = 
                    {
                        (element, index) => {
                            this.onAddCharacteristic(element)
                        }
                    }
                
            />
        )

        obj.popupJSX = popupJSX

        this.props.showAlertPopupX(
            {
                width: 400,
                height: 450
            },
            popupJSX
        )
    }

    onReadyCustomElement(charactId, index) {
        const characteristic = this.props.characteristicReducer.content.get(charactId)

        return (
            <div className = "char-value-holder"
                key = {charactId}
                style = {{
                    height: this.state.height + "px",
                    width: this.state.itemWidth + "px"
                }}
            >
               <label>{characteristic.name}</label>

               <CharValueSelectComponent

                    defaultValue = { this.state.choosenValues.get(charactId) }

                    stopPropagation = {true}

                    onSelected = {
                        (charValueId) => {
                            console.log("CharValueSelectComponent charValueId = " + charValueId)

                            this.state.choosenValues.set(charactId, charValueId)

                            this.props.onCharValuesSelected(this.state.choosenValues)
                        }
                    }

                    data = {
                        characteristic.characteristicValues
                    }

                />

                <a 
                    onClick = { 
                         event => {
                                     
                            event.stopPropagation()

                            const len = this.state.data.length

                            this.state.data.splice(index, 1)
                            this.state.max = this.state.data.length - 1

                            this.state.availableChars.push(charactId)
                            this.showAddButton()

                            if (len > 2) {
                                this.setAnimation("")
                                this.handleClickLeft()
                            }

                            this.updateComponent()
                                        
                            this.state.choosenValues.delete(charactId)

                            this.props.onCharValuesSelected(this.state.choosenValues)
                        }
                    }
                >Remove</a>

            </div>
        )

    }
}



function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showAlertPopupX: showAlertPopupXAction,

        },
        dispatch
    )
}

function mapStateToProps(state) {
    
    return {
        characteristicReducer: state.characteristicReducer
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CharValueSliderComponent)