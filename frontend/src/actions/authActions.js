import setToken from '../securityUtils/setToken';
import { backendUrl } from '../securityUtils/vars';
import axios from 'axios';

export const login = async (reqObj) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const res = await axios.post(
            backendUrl + 'api/auth/login/',
            { reqObj },
            config
        )

        //extract token from data
        const token = res.data.data.token;
        const id = res.data.data.id;
        localStorage.setItem("id", id);
        //store token in local storage
        localStorage.setItem("token", token);
        //set token in header
        setToken(token);

        return {
            errors: {},
            message: res.data?.message,
            success: res.data?.success
        }
    }
    catch (error) {
        return {
            errors: {},
            message: error.message,
            success: false
        }
    }
}