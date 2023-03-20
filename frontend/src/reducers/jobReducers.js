import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_JOBS_FAIL,

    JOB_DETAILS_REQUEST,
    JOB_DETAILS_SUCCESS,
    JOB_DETAILS_FAIL,
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
