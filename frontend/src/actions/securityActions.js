import setToken from '../securityUtils/setToken';
import { backendUrl } from '../securityUtils/vars';
import axios from 'axios';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from './types';


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
        localStorage.setItem('tokenHomework', data.data.token)
        localStorage.setItem('emailHomework', email)
        localStorage.setItem('userIdHomework', data.data.user_id)
        localStorage.setItem('firstnameHomework', data.data.first_name)

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : 'Invalid credentials',
        })
    }
}

export const register = (firstname, lastname, email, password, role) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        // we're passing header into our post request
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // this is the regular axios call, but we're now passing in username, password and the config above
        const { data } = await axios.post(
            backendUrl + 'api/auth/register',
            { 'firstname': firstname, 'lastname': lastname, 'email': email, 'password': password, "role": role },
            config
        )

        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: USER_REGISTER_SUCCESS,
            // just data, not data.data because the auth provided by python doesn't store the data in data variable (unlike mine)
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : 'Register fail',
        })
    }
}