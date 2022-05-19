import {Dispatch} from "redux";
import {NewPasswordAPI} from "../api/new-password-api";
import {loading} from "./registration-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    newPassword: ''
}

export const newPasswordReducer = (state: InitialStateType = initialState, action:
    any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}
// actions

//thunk

export const newPasswordTC = (resetPasswordToken: any, newPassword:string) => (dispatch: Dispatch) => {
    dispatch(loading(true))
    NewPasswordAPI.setPass(resetPasswordToken, newPassword)
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