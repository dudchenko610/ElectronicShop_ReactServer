
import {LOAD_STATES} from "../../../../../core/load-states"
import {CHARACTERISTIC_ACTION_TYPES} from "../actions/characteristic-value-actions"

export const characteristicValueReducer = (state, action) => {


    switch (action.type) {
        
        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE: 

            state.addingCounter = state.addingCounter + 1
            state.addingNewState = LOAD_STATES.LOADING

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE_SUCCESS:

            const characteristicValue5 = action.payload.characteristicValue
            const characteristic =  action.payload.characteristic

            characteristicValue5.state = LOAD_STATES.READY
            characteristicValue5.characteristic = characteristic
            
            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }
            
            state.charValuesContent.set(characteristicValue5.id, characteristicValue5)

            characteristic.characteristicValues.push(characteristicValue5)
            state.state = LOAD_STATES.READY
            
            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_VALUE_FAILED:

            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            state.addingNewState = LOAD_STATES.NONE

            return {
                ...state
            }

        case CHARACTERISTIC_ACTION_TYPES.INSERT_CHARACTERISTIC_VALUE:

            const characteristicValue = action.payload
            const characteristic_001 = state.content.get(characteristicValue.characteristicId)
            
            characteristicValue.state = LOAD_STATES.READY
            characteristicValue.characteristic = characteristic_001

            characteristic_001.characteristicValues.push(characteristicValue)
            state.charValuesContent.push(characteristicValue)
            
            return {
                ...state
            }

        
        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE:

            const characteristicValue7 = action.payload
            characteristicValue7.state = LOAD_STATES.LOADING
            
            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE_SUCCESS:

            const characteristicValue8 = action.payload.characteristicValue
            const characteristic90 = action.payload.characteristic

            if (state.content.length === 0) {
                state.state = LOAD_STATES.NONE
            }

            state.charValuesContent.delete(characteristicValue8.id)
            
            const index356 = characteristic90.characteristicValues.indexOf(characteristicValue8)
            characteristic90.characteristicValues.splice(index356, 1)

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_VALUE_FAILED:

            const characteristicValue800 = action.payload
            characteristicValue800.state = LOAD_STATES.READY

            return {
                ...state
            }

            
        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE:

            const characteristicValue11 = action.payload
            characteristicValue11.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE_SUCCESS:


            const characteristicValueOld = action.payload.old
            const characteristicValueNew = action.payload.new

            characteristicValueOld.name = characteristicValueNew.name
            characteristicValueOld.state = LOAD_STATES.READY

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_VALUE_FAILED:

            const characteristicValueOld2 = action.payload.old
            characteristicValueOld2.state = LOAD_STATES.READY

            return {
                ...state
            }

    }

    return state
}