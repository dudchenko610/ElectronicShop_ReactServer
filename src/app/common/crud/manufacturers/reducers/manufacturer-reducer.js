
import {MANUFACTURER_ACTION_TYPES} from "../actions/manufacturer-actions"
import {LOAD_STATES} from "../../../../../core/load-states"

const initialState = () => {
    return {
        content: new Map(),
        state: LOAD_STATES.FAILED,
        addingNewState: LOAD_STATES.NONE,
        addingCounter: 0,

        currentManufacturer: null
        
    }
}

export const manufacturerReducer = (state = initialState(), action) => {
    switch (action.type) {


        case MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS:
            return {
                ...initialState(),
                state: LOAD_STATES.LOADING
            }
        case MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS_SUCCESS:

            if (action.payload.length === 0) {
                return {
                    ...state,
                    state: LOAD_STATES.NONE
                }
            } else {

                const manufacturers = action.payload
                manufacturers.map((manufacturer, index, array) => {
                    manufacturer.state = LOAD_STATES.READY
                    state.content.set(manufacturer.id, manufacturer)
                })

                return {
                    ...state,
                    state: LOAD_STATES.READY
                }
            }
        case MANUFACTURER_ACTION_TYPES.GET_ALL_MANUFACTURERS_FAILED:
            return {
                ...initialState(),
                state: LOAD_STATES.FAILED
            }
        


        case MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER: 
            return {
                ...state,
                addingCounter: state.addingCounter + 1,
                addingNewState: LOAD_STATES.LOADING
            }
        case MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER_SUCCESS:

            const manufacturer5 = action.payload
            manufacturer5.state = LOAD_STATES.READY
            
            state.content.set(manufacturer5.id, manufacturer5)
            
            state.addingCounter = state.addingCounter - 1


            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }
            
            return {
                ...state,
                state: LOAD_STATES.READY
            }
        case MANUFACTURER_ACTION_TYPES.ADD_MANUFACTURER_FAILED:

            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
            }

            return {
                ...state,
                addingNewState: LOAD_STATES.NONE
            }



        case MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER:

            const manufacturer7 = action.payload
            manufacturer7.state = LOAD_STATES.LOADING
            
            return {
                ...state,
            }
        case MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER_SUCCESS:

            const manufacturer8 = action.payload

            state.content.delete(manufacturer8.id)

            if (state.content.length === 0) {
                state.state = LOAD_STATES.NONE
            }

            return {
                ...state,
            }
        case MANUFACTURER_ACTION_TYPES.REMOVE_MANUFACTURER_FAILED:

            const manufacturer9 = action.payload
            manufacturer9.state = LOAD_STATES.READY

            return {
                ...state,
            }



        case MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER:

            const manufacturer11 = action.payload
            manufacturer11.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        case MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER_SUCCESS:

            const manufacturerOld = action.payload.old
            const manufacturerNew = action.payload.new

            manufacturerOld.name = manufacturerNew.name
            manufacturerOld.state = LOAD_STATES.READY

            return {
                ...state
            }
        case MANUFACTURER_ACTION_TYPES.UPDATE_MANUFACTURER_FAILED:

            const manufacturerOld2 = action.payload.old
            manufacturerOld2.state = LOAD_STATES.READY

            return {
                ...state
            }
    }

    return state
}