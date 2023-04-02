import axios from "axios";
import {
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,

    GET_HOME_VALUES_REQUEST,
    GET_HOME_VALUES_SUCCESS,
    GET_HOME_VALUES_FAIL,
} from "../actions/types";
import { backendUrl } from "../securityUtils/vars";

export const getUserDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_USER_DETAILS_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null
        var token = null

        if (typeof userInfo === 'object') {
            token = userInfo.data.token
        }
        else if (typeof userInfo === 'string') {
            token = userInfo
        }

        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our post request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        }

        const { data } = await axios.get(
            backendUrl + `api/user/${id}`,
            config
        )

        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const getHomeValuesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_HOME_VALUES_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        var config = null
        var token = null

        if (typeof userInfo === 'object') {
            token = userInfo.data.token
        }
        else if (typeof userInfo === 'string') {
            token = userInfo
        }

        if (userInfo == null) {
            config = null
        }
        else {
            // we're passing header into our post request
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        }

        const { data } = await axios.get(
            backendUrl + `api/user/home-data`,
            config
        )

        dispatch({
            type: GET_HOME_VALUES_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_HOME_VALUES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};
