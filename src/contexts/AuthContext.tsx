import { PropTypes } from "@material-ui/core";
import axios from "axios";
import setAuthToken from "ultilities/setAuthToken";
import React, { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { authReducer, AuthState } from "reducers/AuthReducer";
import { BaseReponseModel, IRegisterForm, UserForm } from "model/AuthForm";
import { AuthActionType } from "../reducers/types";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../ultilities/constanst";

const { TOGGLE_AUTH, SET_AUTH } = AuthActionType;

interface Props {
    children: ReactNode;
}

interface AuthContextDefault {
    authState: AuthState;
    loginUser: (userForm: UserForm) => any;
    registerUser: (registerForm: IRegisterForm) => any;
    logoutUser: () => void;
}

const defaultData: AuthState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
};

export const AuthContext = createContext<AuthContextDefault>({
    authState: defaultData,
    loginUser: (userForm: UserForm) => Promise.resolve(void 0),
    registerUser: (registerForm: IRegisterForm) => Promise.resolve(void 0),
    logoutUser: () => {},
});

const AuthContextProvider = ({ children }: Props) => {
    //user reducer
    const [authState, dispatch] = useReducer(authReducer, defaultData);

    //authen user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                        authLoading: false,
                    },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken("");
            dispatch({
                type: SET_AUTH,
                payload: { isAuthenticated: false, user: null, authLoading: false },
            });
        }
    };

    useEffect(() => {
        console.log(process.env);
        console.log(process.env.REACT_APP_SITE_ENV);
        loadUser();
    }, []);

    const loginUser = async (userForm: UserForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data.accessToken);
            }
            await loadUser(); //update reducer
            return response.data;
        } catch (error: any) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    const registerUser = async (registerForm: IRegisterForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data.accessToken);
            }
            await loadUser(); //update reducer
            return response.data;
        } catch (error: any) {
            if (error.response.data) {
                return error.response.data;
            } else {
                return { success: false, message: error.message };
            }
        }
    };

    //logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: { isAuthenticated: false, user: null, authLoading: false },
        });
    };

    //context data
    const authContextData = {
        loginUser,
        authState,
        registerUser,
        logoutUser,
    };

    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
