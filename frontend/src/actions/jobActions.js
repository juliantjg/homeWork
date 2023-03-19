import axios from "axios";
import {
    GET_ALL_JOBS_REQUEST,
    GET_ALL_JOBS_SUCCESS,
    GET_ALL_JOBS_FAIL,
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

        // if userInfo equals null, meaning user is not logged in, we don't wanna pass in config. But if they are logged in we need to pass
        // the user into the backend to check whether or not they've liked a comment
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