import setToken from '../securityUtils/setToken';
import { backendUrl } from '../securityUtils/vars';
import axios from 'axios';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,
} from '../actions/types';


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/auth/login',
            { 'email': email, 'password': password },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: USER_LOGIN_SUCCESS,
            // just data, not data.data because the auth provided by python doesn't store the data in data variable (unlike mine)
            payload: data
        })

        // now finally store the userInfo into local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error.response.data.detail)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.detail
                : 'Invalid credentials',
        })
    }
}