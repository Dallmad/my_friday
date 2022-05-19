import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
import {loading} from "./registration-reducer";
import {ForgotAPI} from "../api/forgot-api";

export type ForgotStateType = {
    loading: boolean
    error: string
    // check: boolean
}

export const ForgotInitState: ForgotStateType = {
    loading: false,
    error: "",
    // check: false
};

export const forgotReducer = (state:ForgotStateType = ForgotInitState, action: any): ForgotStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//action


//thunk

export const forgotTC = (email: string, setCheck: (check:boolean) => void) => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))
        ForgotAPI.forgot(email)
            .then((res) => {
                dispatch(loading(false))
                setCheck(true)
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })
    }
}
