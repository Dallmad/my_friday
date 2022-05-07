import {authAPI, LoginParamsType} from '../api/auth-api';
import {Dispatch} from 'redux';
import {setProfileStateAC} from './profile-reducer';

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
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedIn(true))
            } else {
                console.log('error')
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message
        })
}

export const logout = () => (dispatch: Dispatch<LoginActionsType>) => {
    authAPI.logout()
        .then(res => {
            if (!res.data.error) {
                dispatch(setIsLoggedIn(false))
            } else {
                {
                    console.log('error')
                }
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message
        })
}
export const setUser = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            dispatch(setIsLoggedIn(true))
            dispatch(setProfileStateAC(res.data))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message
            dispatch(setIsLoggedIn(false))
        })
}
// types
type InitialStateType = typeof initialState
export type LoginActionsType = ReturnType<typeof setIsLoggedIn>