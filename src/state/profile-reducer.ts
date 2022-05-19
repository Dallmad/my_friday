import {ResponseUserType} from '../api/auth-api';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/profile-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from "./registration-reducer";

const SET_NEW_NAME = 'profile/SET-NEW-NAME'
const SET_ERROR = 'profile/SET-ERROR'
const SET_NEW_USER_NAME = 'profile/SET_NEW_USER_NAME'

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: Date,
    updated: Date,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case SET_NEW_NAME:
            return {...state,...action.profile}
        case SET_NEW_USER_NAME:
            return {...state,name: action.userName}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}
// actions
export const setProfileStateAC = (profile: ResponseUserType) => ({type: SET_NEW_NAME, profile} as const)
export const setNewUserNameAC = (userName: string) => ({type: SET_NEW_USER_NAME, userName} as const)
export const setErrorAC = (error: string) => ({type: SET_ERROR, error}as const)

// thunk
export const setProfileStateThunk = (name: string) => (dispatch: Dispatch) => {
    dispatch(loading(true))
    profileAPI.changeUserName(name)
        .then(res => {
            dispatch(loading(false))
            dispatch(setProfileStateAC(res.data))
            dispatch(setNewUserNameAC(name))
        })
        .catch(error =>{
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

//types
type InitialStateType = typeof initialState
export type setProfileStateActionType = ReturnType<typeof setProfileStateAC>
export type setErrorActionType = ReturnType<typeof setErrorAC>
export type setNewUserNameActionType = ReturnType<typeof setNewUserNameAC>

export type ProfileActionsType = setProfileStateActionType | setErrorActionType |setNewUserNameActionType
