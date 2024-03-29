import {
    CREATE_JOB_APPLICATION_REQUEST,
    CREATE_JOB_APPLICATION_SUCCESS,
    CREATE_JOB_APPLICATION_FAIL,
    CREATE_JOB_APPLICATION_RESET,

    GET_JOB_APPLICATION_LIST_PER_JOB_REQUEST,
    GET_JOB_APPLICATION_LIST_PER_JOB_SUCCESS,
    GET_JOB_APPLICATION_LIST_PER_JOB_FAIL,

    GET_ASSOCIATED_JOB_APPLICATIONS_REQUEST,
    GET_ASSOCIATED_JOB_APPLICATIONS_SUCCESS,
    GET_ASSOCIATED_JOB_APPLICATIONS_FAIL,

    UPDATE_JOB_APPLICATION_REQUEST,
    UPDATE_JOB_APPLICATION_SUCCESS,
    UPDATE_JOB_APPLICATION_FAIL,
    UPDATE_JOB_APPLICATION_RESET,
} from '../actions/types';


export const createJobApplicationReducers = (state = {}, action) => {
    switch (action.type) {

        case CREATE_JOB_APPLICATION_REQUEST:
            return {
                loading: true
            }

        case CREATE_JOB_APPLICATION_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case CREATE_JOB_APPLICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CREATE_JOB_APPLICATION_RESET:
            return {}

        default:
            return state
    }
}

export const getJobApplicationListPerJobReducers = (state = { jobApplications: [] }, action) => {
    switch (action.type) {

        case GET_JOB_APPLICATION_LIST_PER_JOB_REQUEST:
            return {
                loading: true,
                jobApplications: []
            }

        case GET_JOB_APPLICATION_LIST_PER_JOB_SUCCESS:
            return {
                loading: false,
                jobApplications: action.payload
            }

        case GET_JOB_APPLICATION_LIST_PER_JOB_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const getAssociatedJobApplicationsReducers = (state = { jobApplications: [] }, action) => {
    switch (action.type) {

        case GET_ASSOCIATED_JOB_APPLICATIONS_REQUEST:
            return {
                loading: true,
                jobApplications: []
            }

        case GET_ASSOCIATED_JOB_APPLICATIONS_SUCCESS:
            return {
                loading: false,
                jobApplications: action.payload
            }

        case GET_ASSOCIATED_JOB_APPLICATIONS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const updateJobApplicationReducers = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_JOB_APPLICATION_REQUEST:
            return {
                loading: true
            }

        case UPDATE_JOB_APPLICATION_SUCCESS:
            return {
                loading: false,
                message: action.payload
            }

        case UPDATE_JOB_APPLICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_JOB_APPLICATION_RESET:
            return {}

        default:
            return state
    }
}
