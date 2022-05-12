import {Dispatch} from 'redux';
import {setErrorAC, setErrorActionType} from '../state/profile-reducer';


export const handleServerNetworkError = (error: string , dispatch: Dispatch<setErrorActionType>) => {
    dispatch(setErrorAC(error ? error: 'Some error occurred'))
}