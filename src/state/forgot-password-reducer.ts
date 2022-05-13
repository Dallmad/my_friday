import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
import {forgotPasswordAPI, ForgotPasswordType} from "../api/forgot-password-api";
import {loading} from "./registration-reducer";

const SEND_NEW_PASSWORD = 'forgot/SEND-NEW-PASSWORD'

const initialState = {

}

export const forgotPasswordReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_NEW_PASSWORD:
            return {...state, email: action.payload.email}
        default:
            return state
    }
}
// actions
export const sendNewPassword = (email:ForgotPasswordType) => {
    return {
        type: SEND_NEW_PASSWORD,
        payload: {
            email
        }
    } as const

}

//thunk
export const forgotPasswordTC = (obj: ForgotPasswordType) => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))
        forgotPasswordAPI.forgot(obj)
            .then((res) => {
                if (res.data.email) {
                    dispatch(sendNewPassword(res.data.email))
                    dispatch(loading(false))
                }
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })

    }
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof sendNewPassword>