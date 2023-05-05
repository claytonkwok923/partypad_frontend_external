import { combineReducers } from "redux";


const isAuthenticated = (isAuthenticated = false, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return true;
        case "LOGOUT":
            return false;
        default:
            return isAuthenticated;
    }
}

const reducer = combineReducers({
    isAuthenticated
});

export default reducer;

