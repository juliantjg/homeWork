import axios from "axios";
import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_JOBS_FAIL,

    JOB_DETAILS_REQUEST,
    JOB_DETAILS_SUCCESS,
    JOB_DETAILS_FAIL,
} from "../actions/types";
import { useNavigate, withRouter } from "react-router-dom";
import { backendUrl } from "../securityUtils/vars";

export const getAllJobsAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_JOBS_REQUEST })

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
        console.log(config)
        var url = backendUrl + `api/job/all`;

        const { data } = await axios.get(
            url,
            config
        )

        dispatch({
            type: GET_ALL_JOBS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_JOBS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};

export const getJobDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: JOB_DETAILS_REQUEST })

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
            backendUrl + `api/job/read/${id}`,
            config
        )

        dispatch({
            type: JOB_DETAILS_SUCCESS,
            // data.data because that is how i made it in the backend, the array of data is inside the data variable
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: JOB_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};
