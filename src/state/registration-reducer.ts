import {Dispatch} from "redux";
import {registrationAPI, RegistrationType} from "../api/registration-api";
import {handleServerNetworkError} from '../utils/error-utils';

const REGISTRATION = 'registration/REGISTRATION'
const initialState = {isRegistration: false}

export const registrationReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION:
            return {...state, isRegistration: true}
        default:
            return state
    }
}

// actions
export const registration = () =>
    ({type: REGISTRATION} as const)

// thunk
export const registrationTC = (obj: RegistrationType) => {
    return (dispatch: Dispatch) => {
        registrationAPI.registration(obj)
            .then((res) => {
                if (res.data.addedUser) {
                    dispatch(registration())
                }
            })
            .catch(error =>{
                handleServerNetworkError(error.response.data.error, dispatch)
            })
    }
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof registration>
