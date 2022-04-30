 import axios from 'axios';
import {Dispatch} from "redux";
import {Simulate} from "react-dom/test-utils";

// types

type AxiosResponse = {
    updatedUser: ProfileStateType
    error?: string
}

type InitialStateType = typeof initialState
export type ProfileStateType = {
    _id?: string;
    email?: string;
    name?: string;
    avatar?: string;
    publicCardPacksCount?: number;
// количество колод

    created?: Date;
    updated?: Date;
    isAdmin?: boolean;
    verified?: boolean; // подтвердил ли почту
    rememberMe?: boolean;

    error?: string;
}
type ActionsType = ReturnType<typeof setProfileStateAC>


// API

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



const initialState = {}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET-NEWNAME':
            let newState = {...action.profile}
            return newState
        default:
            return state
    }
}
// actions
export const setProfileStateAC = (profile: ProfileStateType) => ({type: 'profile/SET-NEWNAME', profile} as const)

// thunk

export const setProfileStateThunk = (name: string, avatar: string) => (dispatch: any) => {
    instance.put<any, any>('auth/me', {name , avatar})
        .then( res => {
            console.log(res)
            dispatch(setProfileStateAC(res.updatedUser))
        }
        )
        .catch( error => console.log(error.message))
}



