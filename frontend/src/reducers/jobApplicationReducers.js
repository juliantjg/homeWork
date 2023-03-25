import {
    CREATE_JOB_APPLICATION_REQUEST,
    CREATE_JOB_APPLICATION_SUCCESS,
    CREATE_JOB_APPLICATION_FAIL,
    CREATE_JOB_APPLICATION_RESET,
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
