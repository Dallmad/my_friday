import {Dispatch} from 'redux';
import {loading} from './registration-reducer';
import {packsAPI} from '../api/packs-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {fetchPacksAC} from './packs-reducer';


const FETCH_PARAMS = 'params/FETCH_PARAMS'

const initialState = {
    packName: '',
    min: 0,
    max: 5,
    sortPacks: '0updated',
    page: 1,
    pageCount: 5,
    //user_id: ''
}

export const paramsReducer = (state: GetParamsRequestType = initialState, action: ActionsType): GetParamsRequestType => {
    switch (action.type) {
        case FETCH_PARAMS:
            return {...state,...action.params}
        default:
            return state
    }
}

//actions
export const fetchParamsAC = (params: GetParamsRequestType) => ({type: FETCH_PARAMS, params} as const)

//thunks
export const fetchParamsTC = (packName:string) => (dispatch: Dispatch) => {
    dispatch(loading(true))
    packsAPI.getPacks(packName as any)
        .then((res) => {
            dispatch(fetchPacksAC(res.data.cardPacks))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}


//types
export type GetParamsRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    //user_id?: string
}
export type fetchParamsActionType = ReturnType<typeof fetchParamsAC>

type ActionsType = fetchParamsActionType













