import {
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL,

    GET_HOME_VALUES_REQUEST,
    GET_HOME_VALUES_SUCCESS,
    GET_HOME_VALUES_FAIL,

    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAIL,
} from '../actions/types';

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case GET_USER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case GET_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case GET_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const homeValuesReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case GET_HOME_VALUES_REQUEST:
            return {
                loading: true,
                ...state
            }

        case GET_HOME_VALUES_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case GET_HOME_VALUES_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const getNotificationReducer = (state = { notification: {} }, action) => {
    switch (action.type) {

        case GET_NOTIFICATION_REQUEST:
            return {
                loading: true,
                ...state
            }

        case GET_NOTIFICATION_SUCCESS:
            return {
                loading: false,
                notification: action.payload
            }

        case GET_NOTIFICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}
