import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import { userLoginReducers, userRegisterReducers } from "./reducers/securityReducers";
import { getAllJobsReducer, jobDetailsReducer } from "./reducers/jobReducers";

const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,

    getAllJobs: getAllJobsReducer,
    jobDetails: jobDetailsReducer,
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