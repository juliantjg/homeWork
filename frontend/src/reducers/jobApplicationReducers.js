import {
    CREATE_JOB_APPLICATION_REQUEST,
    CREATE_JOB_APPLICATION_SUCCESS,
    CREATE_JOB_APPLICATION_FAIL,
    CREATE_JOB_APPLICATION_RESET,

    GET_JOB_APPLICATION_LIST_PER_JOB_REQUEST,
    GET_JOB_APPLICATION_LIST_PER_JOB_SUCCESS,
    GET_JOB_APPLICATION_LIST_PER_JOB_FAIL,
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
