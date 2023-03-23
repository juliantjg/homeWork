import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_JOBS_FAIL,

    JOB_DETAILS_REQUEST,
    JOB_DETAILS_SUCCESS,
    JOB_DETAILS_FAIL,

    UPDATE_JOB_DETAILS_REQUEST,
    UPDATE_JOB_DETAILS_SUCCESS,
    UPDATE_JOB_DETAILS_FAIL,
    UPDATE_JOB_DETAILS_RESET,

    CREATE_JOB_REQUEST,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_FAIL,
    CREATE_JOB_RESET,

    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAIL,
    DELETE_JOB_RESET,
} from '../actions/types';

export const getAllJobsReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {

        case GET_ALL_JOBS_REQUEST:
            return {
                loading: true,
                jobs: []
            }

        case GET_ALL_JOBS_SUCCESS:
            return {
                loading: false,
                jobs: action.payload
            }

        case GET_ALL_JOBS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const jobDetailsReducer = (state = { job: {} }, action) => {
    switch (action.type) {

        case JOB_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }

        case JOB_DETAILS_SUCCESS:
            return {
                loading: false,
                job: action.payload
            }

        case JOB_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const updateJobDetailsReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_JOB_DETAILS_REQUEST:
            return {
                loading: true
            }

        case UPDATE_JOB_DETAILS_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case UPDATE_JOB_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_JOB_DETAILS_RESET:
            return {}

        default:
            return state
    }
}

export const createJobReducers = (state = {}, action) => {
    switch (action.type) {

        case CREATE_JOB_REQUEST:
            return {
                loading: true
            }

        case CREATE_JOB_SUCCESS:
            return {
                loading: false,
                job: action.payload
            }

        case CREATE_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_JOB_RESET:
            return {}

        default:
            return state
    }
}

export const deleteJobReducers = (state = {}, action) => {
    switch (action.type) {

        case DELETE_JOB_REQUEST:
            return {
                loading: true,
            }

        case DELETE_JOB_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case DELETE_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_JOB_RESET:
            return {}


        default:
            return state
    }
}
