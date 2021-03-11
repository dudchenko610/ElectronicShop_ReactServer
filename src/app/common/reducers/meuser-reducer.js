import Cookies from 'universal-cookie';
import { LOAD_STATES } from "../../../core/load-states"

import {loginReducer} from "../../pages/login/reducers/login-reducer"
import {registerReducer} from "../../pages/register/reducers/register-reducer"
import {profileReducer} from "../../pages/profile/reducers/profile-reducer"

import { PROFILE_ACTION_TYPES } from "../actions/meuser-actions"
import { saveObjectToStorage } from '../../../core/local-storage-handler';

export const getAuthToken = () => {
    const cookies = new Cookies();
    return cookies.get('authToken')
}

const getAuthTokenFromCookies = () => {
    const cookies = new Cookies();


    var token = "";
    token = cookies.get('authToken')

    var isAuthenticated = token !== "" && token !== null && token !== undefined;

    return {
        authToken: token,
        isAuthenticated: isAuthenticated,
        isAdmin: false,
        user: null,
        role: null,

        avatarModel: null,

        state: LOAD_STATES.NONE

    }
}

export const meuserReducer = (state = getAuthTokenFromCookies(), action) => {

    if (loginReducer(state, action) | registerReducer(state, action) | profileReducer(state, action)) {

        

        return {
            ...state
        }
    }
    

    const cookies = new Cookies();

    switch (action.type) {
        
        case PROFILE_ACTION_TYPES.UPDATE_USER_SUCCESS:



            return {
                ...state,
                user: action.payload
            }

        case PROFILE_ACTION_TYPES.LOGOUT:
            cookies.set("authToken", "", { path: '/' })
            saveObjectToStorage("orderItemsList", [])

            return {
                authToken: "",
                client: null,
                user: null,
                isAuthenticated: false,
                isAdmin:false,
                avatarModel : null,
                state: LOAD_STATES.NONE
            }
    }

    return state


}




