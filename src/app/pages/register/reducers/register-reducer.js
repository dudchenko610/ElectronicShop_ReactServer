import Cookies from 'universal-cookie';
import { saveObjectToStorage } from '../../../../core/local-storage-handler';

import {REGISTER_ACTION_TYPES} from "../actions/register-actions"

export const registerReducer = (state, action) => {
    const cookies = new Cookies();

    switch(action.type) {
        case REGISTER_ACTION_TYPES.REGISTER_SUCCESS:

            cookies.set("authToken", action.payload.token, { path: '/' });
            saveObjectToStorage("orderItemsList", [])

            state.authToken = action.payload
            state.isAuthenticated = true
        return true
    }

    return false
}
