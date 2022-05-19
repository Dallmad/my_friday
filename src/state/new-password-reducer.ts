import {Dispatch} from "redux";
import {NewPasswordAPI} from "../api/new-password-api";
import {loading} from "./registration-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import CheckEmail from "../features/CheckEmail/CheckEmail";

export type NewPasswordStateType = {
    newPassword: string
    error: string
}

export const NewPasswordInitialState: NewPasswordStateType = {
    newPassword: '',
    error: ''
}

export const newPasswordReducer = (state: NewPasswordStateType = NewPasswordInitialState, action:
    any): NewPasswordStateType => {
    switch (action.type) {
        default:
            return state
    }
}
// actions

//thunk

export const newPasswordTC = (resetPasswordToken: any, newPassword:string, setLoginPage: (loginPage:boolean) => void) =>
    (dispatch: Dispatch) => {
        dispatch(loading(true))
        NewPasswordAPI.setPass(resetPasswordToken, newPassword)
            .then((res) => {
                dispatch(loading(false))
                // @ts-ignore
                dispatch(setLoginPage(true))
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })
    }

// types