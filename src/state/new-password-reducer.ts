import {Dispatch} from "redux";
import {NewPassAPI} from "../api/new-password-api";
import {loading} from "./registration-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    newPassword: ''
}

export const newPasswordReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-NEW-PASSWORD':
            return state
        default:
            return state
    }
}
// actions
export const setNewPassword = () =>
    ({type: 'registration/SET-NEW-PASSWORD'} as const)

//thunk

export const newPasswordTC = (resetPasswordToken: any, newPassword:string) => (dispatch: Dispatch) => {
    dispatch(loading(true))
    NewPassAPI.setPass(resetPasswordToken, newPassword)
        .then((res) => {
            dispatch(loading(false))
        })
        .catch(error =>{
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })

}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setNewPassword>