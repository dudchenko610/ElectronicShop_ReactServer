import Cookies from 'universal-cookie';
import { saveObjectToStorage } from '../../../../core/local-storage-handler';

import {LOGIN_ACTION_TYPES} from "../actions/login-actions"

export const loginReducer = (state, action) => {
    const cookies = new Cookies();

    switch(action.type) {
        case LOGIN_ACTION_TYPES.LOGIN_SUCCESS:

            cookies.set("authToken", action.payload.token, { path: '/' });
            saveObjectToStorage("orderItemsList", [])

            state.authToken = action.payload
            state.isAuthenticated = true
        return true
    }

    return false
}
