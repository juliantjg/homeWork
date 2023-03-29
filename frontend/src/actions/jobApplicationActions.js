import axios from "axios";
import {
    CREATE_JOB_APPLICATION_REQUEST,
    CREATE_JOB_APPLICATION_SUCCESS,
    CREATE_JOB_APPLICATION_FAIL,

    GET_JOB_APPLICATION_LIST_PER_JOB_REQUEST,
    GET_JOB_APPLICATION_LIST_PER_JOB_SUCCESS,
    GET_JOB_APPLICATION_LIST_PER_JOB_FAIL,

    UPDATE_JOB_APPLICATION_REQUEST,
    UPDATE_JOB_APPLICATION_SUCCESS,
    UPDATE_JOB_APPLICATION_FAIL,
} from "../actions/types";
import { useNavigate, withRouter } from "react-router-dom";
import { backendUrl } from "../securityUtils/vars";


export const createJobApplicationAction = (jobApplicationDetails) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_JOB_APPLICATION_REQUEST
        })

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

        const { data } = await axios.post(
            backendUrl + 'api/jobapplication/create',
            jobApplicationDetails,
            config
        )


        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: CREATE_JOB_APPLICATION_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: CREATE_JOB_APPLICATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getJobApplicationListPerJobAction = (jobId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_JOB_APPLICATION_LIST_PER_JOB_REQUEST })

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

        // remember to use backticks here instead of quotes to pass in the id
        const { data } = await axios.get(
            backendUrl + `api/jobapplication/all/${jobId}`,
            config
        )

        dispatch({
            type: GET_JOB_APPLICATION_LIST_PER_JOB_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_JOB_APPLICATION_LIST_PER_JOB_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const updateJobApplicationAction = (status, jobApplicationId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_JOB_APPLICATION_REQUEST
        })

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
            config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        }

        const { data } = await axios.put(
            backendUrl + 'api/jobapplication/update/' + jobApplicationId,
            { "status": status },
            config
        )


        // the regular success dispatch, with payload data from the axios call above
        dispatch({
            type: UPDATE_JOB_APPLICATION_SUCCESS,
            payload: data.message
        })


    } catch (error) {
        dispatch({
            type: UPDATE_JOB_APPLICATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

