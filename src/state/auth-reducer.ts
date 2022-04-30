import {authAPI, LoginParamsType} from '../api/auth-api';
import {Dispatch} from 'redux';
import { ThunkAction } from 'redux-thunk';
import {AppActionType, AppRootStateType, TypedDispatch} from './store';

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
export const login = (data: LoginParamsType):ThunkAction<void,AppRootStateType,unknown,AppActionType> => (dispatch: TypedDispatch) => {
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
/*export const login = (data: LoginParamsType):ThunkAction<void,AppRootStateType,unknown,AppActionType> => async dispatch => {
    try {
        const res = await authAPI.login(data)
        if (!res.data.error) {
            dispatch(setIsLoggedIn(true))
        } else {console.log('Error')}
    }
    catch(e: any) {
        throw new Error(e)
    }
        /!*const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
            console.log('Error: ', {...e})*!/
}*/

export const logout = () => (dispatch: Dispatch<LoginActionsType>) => {
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
/*type setIsLoggedInType = {
    type: string
    value: boolean
}*/

export type LoginActionsType = ReturnType<typeof setIsLoggedIn>