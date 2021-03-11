
import {SIGNALR_ACTION_TYPES} from "../actions/signalr-actions"
import {LOAD_STATES} from "../../../core/load-states"

const initialState = {

    hubConnection: null,
    state: SIGNALR_ACTION_TYPES.INIT_SIGNALR

}


export const signalRReducer = (state = initialState, action) => {

    switch (action.type) {

        case SIGNALR_ACTION_TYPES.INIT_SIGNALR:
            return {
                hubConnection: null,
                state: LOAD_STATES.LOADING
            }
        case SIGNALR_ACTION_TYPES.INIT_SIGNALR_SUCCESS:
            return {
                hubConnection: action.payload,
                state: LOAD_STATES.READY
            }
        case SIGNALR_ACTION_TYPES.INIT_SIGNALR_FAILED:
            return {
                hubConnection: null,
                state: LOAD_STATES.FAILED
            }
        case SIGNALR_ACTION_TYPES.INIT_SIGNALR_DISCONNECTED:
            return {
                hubConnection: null,
                state: LOAD_STATES.FAILED
            }


        default:
            return state

    }


}