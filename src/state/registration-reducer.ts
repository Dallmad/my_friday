import {Dispatch} from "redux";
import {registrationAPI, RegistrationType} from "../api/registration-api";

const REGISTRATION = 'registration/REGISTRATION'
const LOADING = 'registration/LOADING'
const initialState = {
    isRegistration: false,
    isLoading: false
}

export const registrationReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION:
            return {...state, isRegistration: true}
        case LOADING:
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

// actions
export const registration = () =>
    ({type: REGISTRATION} as const)

export const loading = (isLoading: boolean) =>
    ({type: LOADING, isLoading} as const)

// thunk
export const registrationTC = (obj: RegistrationType) => {
    return (dispatch: Dispatch) => {
        dispatch(loading(true))
        registrationAPI.registration(obj)
            .then((res) => {
                if (res.data.addedUser) {
                    dispatch(registration())
                    dispatch(loading(false))
                }
            })
            .catch((error) => {
                alert(error.response.data.error ? error.response.data.error : '');
            })
    }
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof registration> | ReturnType<typeof loading>
