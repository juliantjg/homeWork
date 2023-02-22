import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import { userLoginReducers } from "./reducers/securityReducers";

const reducer = combineReducers({
    userLogin: userLoginReducers,
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