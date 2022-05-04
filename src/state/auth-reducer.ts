import {authAPI, LoginParamsType} from '../api/auth-api';
import {Dispatch} from 'redux';
import {setProfileStateAC} from './profile-reducer';
import {handleServerNetworkError} from '../utils/error-utils';

const SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'
const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action:
    LoginActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: SET_IS_LOGGED_IN, value})

// thunks
export const login = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedIn(true))
        })
        .catch(error => {
           handleServerNetworkError(error.response.data.error, dispatch)
        })
}

export const logout = () => (dispatch: Dispatch<LoginActionsType>) => {
    authAPI.logout()
        .then(res => {
                dispatch(setIsLoggedIn(false))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
}
export const setUser = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            dispatch(setProfileStateAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
}

// types
type InitialStateType = typeof initialState
export type LoginActionsType = ReturnType<typeof setIsLoggedIn>