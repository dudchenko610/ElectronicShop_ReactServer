
import {CATEGORY_ACTION_TYPES} from "../actions/category-actions"
import {LOAD_STATES} from "../../../../../core/load-states"

const initialState = () => {
    return {
        content: new Map(),
        state: LOAD_STATES.FAILED,
        addingNewState: LOAD_STATES.NONE,
        addingCounter: 0,
        
    }
}


export const categoriesReducer = (state = initialState(), action) => {

    switch (action.type) {

        case CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES:
            return {
                ... initialState(),
                state: LOAD_STATES.LOADING
            }
        case CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES_SUCCESS:


            if (action.payload.length === 0) {
                return {
                    ...state,
                    state: LOAD_STATES.NONE
                }
            } else {

                const categories = action.payload
                categories.map((category, index, array) => {
                    category.state = LOAD_STATES.READY
                    category.charactericticIds = []

                    state.content.set(category.id, category)
                })

                return {
                    ...state,
                    state: LOAD_STATES.READY
                }
            }
        case CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES_FAILED:
            return {
                ...initialState(),
                state: LOAD_STATES.FAILED
            }


        case CATEGORY_ACTION_TYPES.ADD_CATEGORY: 
            return {
                ...state,
                addingCounter: state.addingCounter + 1,
                addingNewState: LOAD_STATES.LOADING
            }
        case CATEGORY_ACTION_TYPES.ADD_CATEGORY_SUCCESS:

            const category5 = action.payload
            category5.state = LOAD_STATES.READY
            category5.charactericticIds = []

            state.content.set(category5.id, category5)
            
            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                
                state.addingNewState = LOAD_STATES.NONE

            }
            
            return {
                ...state,
                state: LOAD_STATES.READY
            }
        case CATEGORY_ACTION_TYPES.ADD_CATEGORY_FAILED:


            state.addingCounter = state.addingCounter - 1

            if (state.addingCounter === 0) {
                state.addingNewState = LOAD_STATES.NONE
                
            }

            return {
                ...state,
                addingNewState: LOAD_STATES.NONE
            }


        case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY:

            const category7 = action.payload
            category7.state = LOAD_STATES.LOADING

            return {
                ...state,
            }
        case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_SUCCESS:

            const category8 = action.payload

            state.content.delete(category8.id)

            if (state.content.length === 0) {
                state.state = LOAD_STATES.NONE
            }

            return {
                ...state,
            }
        case CATEGORY_ACTION_TYPES.REMOVE_CATEGORY_FAILED:

            const category9 = action.payload
            category9.state = LOAD_STATES.READY

            return {
                ...state,
            }
        

        case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY:

            const category11 = action.payload
            category11.state = LOAD_STATES.LOADING

            return {
                ...state
            }
        case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS:

            const categoryOld = action.payload.old
            const categoryNew = action.payload.new

            categoryOld.name = categoryNew.name
            categoryOld.state = LOAD_STATES.READY

            return {
                ...state
            }
        case CATEGORY_ACTION_TYPES.UPDATE_CATEGORY_FAILED:

            const categoryOld2 = action.payload.old
            categoryOld2.state = LOAD_STATES.READY

            return {
                ...state
            }


        case CATEGORY_ACTION_TYPES.GET_CATEGORY:

            const category = {
                id: action.payload,
                state: LOAD_STATES.LOADING
            }

            state.content.set(category.id, category)

            return {
                ...state
            }
        case CATEGORY_ACTION_TYPES.GET_CATEGORY_SUCCESS:

            const receivedCategory = action.payload
            state.content.delete(receivedCategory.id)

            receivedCategory.state = LOAD_STATES.READY
            state.content.set(receivedCategory.id, receivedCategory)

            return {
                ...state
            }
        case CATEGORY_ACTION_TYPES.GET_CATEGORY_FAILED:

            const categoryy = state.content.get(action.payload)
            categoryy.state = LOAD_STATES.FAILED

            return {
                ...state
            }

        
    }

    return state
}


