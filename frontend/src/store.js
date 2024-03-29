import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import { userLoginReducers, userRegisterReducers } from "./reducers/securityReducers";
import { getAllJobsReducer, jobDetailsReducer, updateJobDetailsReducers, createJobReducers, deleteJobReducers } from "./reducers/jobReducers";
import { createJobApplicationReducers, getJobApplicationListPerJobReducers, getAssociatedJobApplicationsReducers, updateJobApplicationReducers } from "./reducers/jobApplicationReducers";
import { userDetailsReducer, homeValuesReducer, getNotificationReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,

    getAllJobs: getAllJobsReducer,
    jobDetails: jobDetailsReducer,
    updateJobDetails: updateJobDetailsReducers,
    createJob: createJobReducers,
    deleteJob: deleteJobReducers,

    createJobApplication: createJobApplicationReducers,
    getJobApplicationListPerJob: getJobApplicationListPerJobReducers,
    getAssociatedJobApplications: getAssociatedJobApplicationsReducers,
    updateJobApplication: updateJobApplicationReducers,

    userDetails: userDetailsReducer,
    homeValues: homeValuesReducer,
    getNotification: getNotificationReducer,
})

const userInfoFromStorage = localStorage.getItem('tokenHomework') ?
    localStorage.getItem('tokenHomework') : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
);

export default store;