import {Dispatch} from 'redux';

import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from './registration-reducer';
import {packsAPI} from '../api/packs-api';


const SET_PACKS = 'packs/SET_PACKS'


const initialState = {
    cardPacks: [],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
    switch (action.type) {
        case SET_PACKS:
            return {...state,cardPacks:action.packs.map( p => ({...p}))}
        default:
            return state
    }
}


// actions
export const setPacksAC = (packs: ResponsePackType[]) => ({type: SET_PACKS, packs} as const)

// thunk
export const fetchPacksTC = () => (dispatch: Dispatch) => {
    dispatch(loading(true))
    packsAPI.getPacks()
        .then((res) => {
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}

//types
export type ResponsePackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type ResponsePacksType = {
    cardPacks: ResponsePackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

//export type ResponsePacksType = typeof initialState
export type setPacksActionType = ReturnType<typeof setPacksAC>

type ActionsType = setPacksActionType
