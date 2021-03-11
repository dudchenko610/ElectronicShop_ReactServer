import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import AnimatedDoubleListComponent from "../../../../common/components/animated-double-list-wrapper/AnimatedDoubleListComponent"
import CheckboxComponent from "../../../../common/components/checkbox/CheckboxComponent"
import { CONSOLE_ACTION_TYPES } from "../../../../pages/console/actions/console-actions"
import { LOAD_STATES } from "../../../../../core/load-states"

// onCheckChanged

class CharValueListPicker extends AnimatedDoubleListComponent {

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,

            manufacturersChecked: new Map(),
            charValsChecked: new Map()
        }
    }

    onReadyLowerElement(lowerElement, lowerIndex, upperElement, upperIndex) {

        switch(upperIndex) {
            case 0:
                const manufacturer = this.props.manufacturerReducer.content.get(lowerElement)
                return (
                    <CheckboxComponent
                        key = {lowerIndex}
                        isChecked = { this.state.manufacturersChecked.has(lowerElement) }
                        label = { manufacturer.name }
                        onCheck = { 
                            isChecked => 
                            { 
                                if (isChecked) { 
                                    this.state.manufacturersChecked.set(manufacturer.id, manufacturer)
                                } else { 
                                    this.state.manufacturersChecked.delete(manufacturer.id)
                                } 

                                this.checkPerformed()
                            } 
                        }
                    />
                )
            default:
                return (
                    <CheckboxComponent
                        key = {lowerIndex}
                        isChecked = { this.state.charValsChecked.has( lowerElement.id ) }
                        label = { lowerElement.name }
                        onCheck = { 
                            isChecked => 
                            { 
                                if (isChecked) { 
                                    this.state.charValsChecked.set(lowerElement.id, lowerElement)
                                } else { 
                                    this.state.charValsChecked.delete(lowerElement.id)
                                } 

                                this.checkPerformed()
                            } 
                        }
                    />
                )
        }
    }

    checkPerformed() {

        const manufacturers = []
        const charValues = []

        this.state.manufacturersChecked.forEach((key, value) => {
            manufacturers.push(value)
        })

        this.state.charValsChecked.forEach((key, value) => {
            charValues.push(value)
        })

        this.props.onCheckChanged(manufacturers, charValues)

    }


    onPrepareLowerElements(upperElement, index) {

        switch(index) {
            case 0:
                let manufacturersIds = Array.from( this.props.manufacturerReducer.content.keys() )
                return manufacturersIds
            default:
                const characteistic = this.props.characteristicReducer.content.get(upperElement)
                return characteistic.characteristicValues
        }
    }

    onUpperElementLabel(upperElement, index) {

        switch(index) {
            case 0:
                // upperElement is empty, just for additional index
                return "Manufacturers"
            default:
                const characteistic = this.props.characteristicReducer.content.get(upperElement)
                return characteistic.name
        }
    }

    onReadyElement(charactId, index, array) {


        if (index !== 0) {
            const characteistic = this.props.characteristicReducer.content.get(charactId)

            if (characteistic.categoryId !== this.props.categoryId) {
                return null
            }
        }

        return super.onReadyElement(charactId, index, array)
    }

    isExpanded(upperElement, index) {

        if (index == 0) {

          //  console.log(this.state.manufacturersChecked.size)

            if (this.state.manufacturersChecked.size > 0) {
                return true
            }

            return false
        } else {
            const characteistic = this.props.characteristicReducer.content.get(upperElement)
            let res = false
            characteistic.characteristicValues.forEach((value, key) => {
                if (this.state.charValsChecked.has(value.id)) {
                    res = true
                }
            })

            return res
        }

        
    }

    onUpdate() {
        // copy checked from props

        if (this.props.manufacturersIdsChecked && this.props.manufacturerReducer.state === LOAD_STATES.READY) {
            this.props.manufacturersIdsChecked.map((manufactId, index, array) => {

                const manId = parseInt(manufactId)

                if (!this.state.manufacturersChecked.has(manId)) {
                    const manufacturer = this.props.manufacturerReducer.content.get(manId)
                    this.state.manufacturersChecked.set(manufacturer.id, manufacturer)
                }

            })
        } else {
            this.state.manufacturersChecked.clear()

        }

       // console.log(this.props.charValIdsChecked)

        if (this.props.charValIdsChecked && this.props.characteristicReducer.state === LOAD_STATES.READY) {
            this.props.charValIdsChecked.map((charValId, index, array) => {

                const chVlId = parseInt(charValId)

                if (!this.state.charValsChecked.has(chVlId)) {
                    
                    const charVal = this.props.characteristicReducer.charValuesContent.get(chVlId)
                    this.state.charValsChecked.set(charVal.id, charVal)
                }

            })
        } else {
            this.state.charValsChecked.clear()
        }
    }

}


function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
         //   getCategories: getCategoriesAction
        },
        dispatch
    )
}

function mapStateToProps(state) {

    let characteristicsIds = Array.from( state.characteristicReducer.content.keys() );

    const _data = [
        {
             
        },
        ...characteristicsIds
    ]

    return {
        characteristicReducer: state.characteristicReducer,
        manufacturerReducer: state.manufacturerReducer,

        data: _data,
        state: state.characteristicReducer.state
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CharValueListPicker)