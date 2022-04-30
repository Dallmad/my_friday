import {authAPI, LoginParamsType} from '../api/auth-api';
import {Dispatch} from 'redux';

const SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedIn = (value: boolean) =>
    ({type: SET_IS_LOGGED_IN, value}as const)

// thunks
export const login = (data: LoginParamsType) => (dispatch: Dispatch) => {
    authAPI.login(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedIn(true))
            } else {console.log('error')}
        })
        .catch((e) => {const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
         console.log('Error: ', {...e})
        })
}

export const logout = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logout()
        .then(res => {
            if (!res.data.error) {
                dispatch(setIsLoggedIn(false))
            } else {
                {console.log('error')}
            }
        })
        .catch((e) => {const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
        console.log('Error: ', {...e})
        })
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedIn>