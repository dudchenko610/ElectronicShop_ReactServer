
import {CHARACTERISTIC_ACTION_TYPES} from "../actions/characteristic-actions"
import {LOAD_STATES} from "../../../../../core/load-states"

import {characteristicValueReducer} from "../../characteristic-values/reducers/characteristic-value-reducer"

const initialState = () => {
    return {
        content: new Map(),
        state: LOAD_STATES.FAILED,

        addingCounter: 0,
        addingNewState: LOAD_STATES.NONE,

        charValuesContent: new Map()
        
    }
}


export const characteristicReducer = (state = initialState(), action) => {

    let categoriesReducer

    switch (action.type) {

        case CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS:
            return {
                ...initialState(),
                state: LOAD_STATES.LOADING
            }
        case CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS_SUCCESS:

            categoriesReducer = action.payload.categoriesReducer

            categoriesReducer.content.forEach((category, key) => {
                category.charactericticIds = []
            })
            
            const characteristics = action.payload.data

            if (characteristics.length === 0) {
                return {
                    ...state,
                    state: LOAD_STATES.NONE
                }
            } else {

                characteristics.map((characteristic, index, array) => {
                    
                    const catt = categoriesReducer.content.get(characteristic.categoryId)
                    catt.charactericticIds.push(characteristic.id)

                    characteristic.characteristicValues.map((charVal, j_index, j_array) => {
                        charVal.characteristic = characteristic  ////////////
                        charVal.state = LOAD_STATES.READY

                        if (!state.charValuesContent.has(charVal.id)) {
                            state.charValuesContent.set(charVal.id, charVal)
                        }
                    })

                    characteristic.state = LOAD_STATES.READY
                    state.content.set(characteristic.id, characteristic)

                })

                return {
                    ...state,
                    state: LOAD_STATES.READY
                }
            }
        case CHARACTERISTIC_ACTION_TYPES.GET_ALL_CHARACTERISTICS_FAILED:
            return {
                ...initialState(),
                state: LOAD_STATES.FAILED
            }


        case CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC:
        {
            const characteristicId = action.payload

            const characteristic = {
                id: characteristicId,
                state: LOAD_STATES.LOADING
            }

            state.content.set(characteristic.id, characteristic)

            return {
                ...state
            }
        }
        case CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC_SUCCESS:
        {
            const characteristic = action.payload
            characteristic.state = LOAD_STATES.READY

            state.content.delete(characteristic.id)
            state.content.set(characteristic.id, characteristic)
            
            
            characteristic.characteristicValues.forEach((charVal, key) => {
                charVal.characteristic = characteristic
                charVal.state = LOAD_STATES.READY

                state.charValuesContent.set(charVal.id, charVal)
            })

            return {
                ...state
            }

        }
        case CHARACTERISTIC_ACTION_TYPES.GET_CHARACTERISTIC_FAILED:

            const characteristicId_03 = action.payload
            const characteristic_03_old = state.content.get(characteristicId_03)
            characteristic_03_old.state = LOAD_STATES.FAILED

            return {
                ...state
            }


        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC: 
            return {
                ...state,
                addingCounter: state.addingCounter + 1,
                addingNewState: LOAD_STATES.LOADING
            }
        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_SUCCESS:

            categoriesReducer = action.payload.categoriesReducer

            const characteristic5 = action.payload.data
            characteristic5.state = LOAD_STATES.READY
            characteristic5.expanded = false

            state.content.set(characteristic5.id, characteristic5)
            
            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            const catt2 = categoriesReducer.content.get(characteristic5.categoryId)
            catt2.charactericticIds.push(characteristic5.id)
            
            characteristic5.characteristicValues.map((charVal, j_index, j_array) => {
                charVal.characteristic = characteristic5
                charVal.state = LOAD_STATES.READY

                if (!state.charValuesContent.has(charVal.id)) {
                    state.charValuesContent.set(charVal.id, charVal)
                }
            })

            return {
                ...state,
                state: LOAD_STATES.READY
            }
        case CHARACTERISTIC_ACTION_TYPES.ADD_CHARACTERISTIC_FAILED:

            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            return {
                ...state,
                addingNewState: LOAD_STATES.NONE
            }


        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC:

            const characteristics7 = action.payload
            characteristics7.state = LOAD_STATES.LOADING
            
            return {
                ...state,
            }
        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_SUCCESS:

            categoriesReducer = action.payload.categoriesReducer

            const characteristics8 = action.payload.data

            state.content.delete(characteristics8.id)

            if (state.content.length === 0) {
                state.state = LOAD_STATES.NONE
            }

            characteristics8.characteristicValues.map((charVal, j_index, j_array) => {
                state.charValuesContent.delete(charVal.id)
            })

            const catt3 = categoriesReducer.content.get(characteristics8.categoryId)
            const index3 = catt3.charactericticIds.indexOf(characteristics8.id)

            catt3.charactericticIds.splice(index3, 1)

            return {
                ...state,
            }
        case CHARACTERISTIC_ACTION_TYPES.REMOVE_CHARACTERISTIC_FAILED:

            const characteristics9 = action.payload
            characteristics9.state = LOAD_STATES.READY

            return {
                ...state,
            }


        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC:

            const characteristic11 = action.payload
            characteristic11.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_SUCCESS:

            const characteristicOld = action.payload.old
            const characteristicNew = action.payload.new

            characteristicOld.name = characteristicNew.name
            characteristicOld.state = LOAD_STATES.READY

            return {
                ...state
            }
        case CHARACTERISTIC_ACTION_TYPES.UPDATE_CHARACTERISTIC_FAILED:

            const characteristicOld2 = action.payload.old
            characteristicOld2.state = LOAD_STATES.READY

            return {
                ...state
            }

    }

    return characteristicValueReducer(state, action)

}