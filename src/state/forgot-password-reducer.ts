import {Dispatch} from "redux";
import {loading} from "./registration-reducer";

const SEND_NEW_PASSWORD = 'forgot/SEND-NEW-PASSWORD'

const initialState = {

}

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

//thunk
export const forgotPasswordTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))

    }
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof sendNewPassword>