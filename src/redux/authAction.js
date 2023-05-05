export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const login = () => async (dispatch) => {
    dispatch(loginSuccess());
};


export const LOGOUT = "LOGOUT";

export const logoutSuccess = () => ({
    type: LOGOUT,
});

export const logout = () => async (dispatch) => {
    dispatch(logoutSuccess());
};