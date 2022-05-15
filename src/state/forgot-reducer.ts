import {Dispatch} from "redux";
import {handleServerNetworkError} from "../utils/error-utils";
import {loading} from "./registration-reducer";
import {ForgotAPI} from "../api/forgot-api";

export type ForgotStateType = {
    loading: boolean;
    success: boolean;
    error: string;
}

export const ForgotInitialState: ForgotStateType = {
    loading: false,
    success: false,
    error: "",
};


export const forgotReducer = (state = ForgotInitialState, action: ForgotActionsType): ForgotStateType => {
    switch (action.type) {
        case "forgot/SET_LOADING":
            return {
                ...state,
                error: '',
                loading: action.payload.isLoading,
                success: false,
            }
        case "forgot/SET_SUCCESS":
            return {
                ...state,
                error: '',
                loading: false,
                success: action.payload.success,
            }
        case "forgot/SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
                loading: false,
                success: false,
            }
        default: {
            return state
        }
    }
}


//action

export const setLoadingAC = (isLoading: boolean) => {
    return {
        type: 'forgot/SET_LOADING',
        payload: {
            isLoading
        }
    } as const
}

export const setSuccessAC = (success: boolean) => {
    return {
        type: 'forgot/SET_SUCCESS',
        payload: {
            success
        }
    } as const
}

export const setErrorAC = (error: string) => {
    return {
        type: 'forgot/SET_ERROR',
        payload: {
            error
        }
    } as const
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetSuccessActionType = ReturnType<typeof setSuccessAC>
export type SetLoadingActionType = ReturnType<typeof setLoadingAC>
export type ForgotActionsType = SetLoadingActionType
    | SetErrorActionType
    | SetSuccessActionType


//thunk

export const forgotTC = (email: string):any => {
    return (dispatch: Dispatch) => {
        dispatch(setLoadingAC(true))
        ForgotAPI.forgot(email)
            .then((res) => {
                // @ts-ignore
                if (res.data.statusCode === 200)
                dispatch(setLoadingAC(false))
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
                dispatch(loading(false))
            })
    }
}
