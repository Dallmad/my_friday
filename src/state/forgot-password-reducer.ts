import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
//mport {forgotPasswordAPI, ForgotPasswordType} from "../api/forgot-password-api";
import {loading} from "./registration-reducer";

const SEND_NEW_PASSWORD = 'forgot/SEND-NEW-PASSWORD'

const initialState = {}

export const forgotPasswordReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_NEW_PASSWORD:
            return {...state}
        default:
            return state
    }
}
// actions
export const sendNewPassword = () =>
    ({type: SEND_NEW_PASSWORD} as const)

// thunks
/*export const forgotPasswordTC = (obj: ForgotPasswordType) => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))
        forgotPasswordAPI.forgot(obj)
            .then((res) => {
                if (res.data.email) {
                    dispatch(sendNewPassword())
                    dispatch(loading(false))
                }
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })
    }
}*/

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof sendNewPassword>