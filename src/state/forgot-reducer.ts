import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
import {loading} from "./registration-reducer";
import {ForgotAPI, ForgotDataType} from "../api/forgot-api";

export type ForgotStateType = {
    loading: boolean;
    success: boolean;
    error: string;
}

export const ForgotInitState: ForgotStateType = {
    loading: false,
    success: false,
    error: "",
};

export const forgotReducer = (state:ForgotStateType = ForgotInitState, action: any): ForgotStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//thunk

export const forgotTC = (email: string) => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))
        ForgotAPI.forgot(email)
            .then((res) => {
                dispatch(loading(false))
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })
    }
}
