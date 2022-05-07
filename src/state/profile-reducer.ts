import {ResponseUserType} from '../api/auth-api';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/profile-api';
import {setIsLoggedIn} from "./auth-reducer";

const SET_NEW_NAME = 'profile/SET-NEW-NAME'

const initialState = {
    _id: '',
    email: '',
    name: '',
    /*avatar: '',*/
    publicCardPacksCount: 0,
    /*created: '',
    updated: '',*/
    isAdmin: false,
    verified: false,
    rememberMe: false,
    /*error: '',*/
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): ResponseUserType => {
    switch (action.type) {
        case SET_NEW_NAME:
            return {...action.profile}
        default:
            return state
    }
}

// actions
export const setProfileStateAC = (profile: ResponseUserType) => ({type: SET_NEW_NAME, profile} as const)

// thunk
export const setProfileStateThunk = (name: string) => (dispatch: Dispatch) => {
    profileAPI.changeUserName(name)
        .then(res => {
            dispatch(setProfileStateAC(res.data))
        })
        .catch(error => {
                console.log(error.message)
            }
        )
}

//types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setProfileStateAC>
