import {Dispatch} from 'redux';
import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from './registration-reducer';
import {packsAPI, RequestCreatePackType, RequestUpdatedPackType} from '../api/packs-api';
import {AppActionType, AppRootStateType, TypedDispatch} from './store';

const FETCH_PACKS = 'packs/FETCH_PACKS'
const CREATE_PACK = 'packs/CREATE_PACK'
const DELETE_PACK = 'packs/DELETE_PACK'
const UPDATED_PACK = 'packs/UPDATED_PACK'
const SET_SORT_PACKS = 'packs/SET_SORT_PACKS'
const SET_SEARCH_PACK = 'packs/SET_SEARCH_PACK'
const SET_PAGE_PACKS = 'packs/SET_PAGE_PACKS'
const SET_NUMBERS_PACKS = 'packs/SET_MIN_NUMBERS_PACKS'


const initialState = {
    cardPacks: [],
    page: 1,
    pageCount: 8,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 5,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '0updated',
}

export const packsReducer = (state: ResponsePacksType = initialState, action: PacksActionsType): ResponsePacksType => {
    switch (action.type) {
        case FETCH_PACKS:
            return {...state, ...action.packs}
        case CREATE_PACK:
            return {...state, ...action.cardsPack}
        case DELETE_PACK:
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action._id)}
        case UPDATED_PACK:
            return {...state, ...action.cardsPack}
        case SET_SORT_PACKS:
            return {...state, sortPacks: action.sortPacks}
        case SET_SEARCH_PACK:
            return {...state, cardPacks: state.cardPacks.filter((p => !!(p.name.search(action.title) + 1)))}
        case SET_PAGE_PACKS:
            return {...state, page: action.page}
        case SET_NUMBERS_PACKS:
            return {...state,minCardsCount:action.minCardsCount,maxCardsCount:action.maxCardsCount}
/*            return {...state, cardPacks:state.cardPacks.filter((c)=> c.cardsCount>=action.minCardsCount && c.cardsCount<=action.maxCardsCount)}*/
        default:
            return state
    }
}

// actions
export const fetchPacksAC = (packs: ResponsePacksType) => ({type: FETCH_PACKS, packs} as const)
export const createPackAC = (cardsPack: RequestCreatePackType) => ({type: CREATE_PACK, cardsPack} as const)
export const deletePackAC = (_id: string) => ({type: DELETE_PACK, _id} as const)
export const updatedPackAC = (cardsPack: RequestUpdatedPackType) => ({type: UPDATED_PACK, cardsPack} as const)
export const setSortPacksAC = (sortPacks: string) =>
    ({type: SET_SORT_PACKS, sortPacks} as const)
export const setSearchPackAC = (title: string) =>
    ({type: SET_SEARCH_PACK, title} as const)
export const setPagePacksAC = (page: number) =>
    ({type: SET_PAGE_PACKS, page} as const)
export const setNumbersPacksAC = (minCardsCount: number,maxCardsCount: number) =>
    ({type: SET_NUMBERS_PACKS, minCardsCount, maxCardsCount} as const)


// thunk
export const fetchPacksTC = (userId?: string) => (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {
    let {sortPacks, page, pageCount,minCardsCount,maxCardsCount} = getState().packs

    dispatch(loading(true))
    packsAPI.getPacks({min: minCardsCount, max: maxCardsCount,sortPacks,page,   pageCount,user_id: userId})
        .then((res) => {
            dispatch(fetchPacksAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}

export const createPackTC = (name?: string, deckCover?: string) => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    packsAPI.createPack
    ({name, deckCover, private: false})
        .then((res) => {
            dispatch(createPackAC(res.data.newCardsPack))
            dispatch(fetchPacksTC())
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}

export const deletePackTC = (_id: string) => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    packsAPI.deletePack(_id)
        .then((res) => {
            dispatch(deletePackAC(res.data.deletedCardsPack._id))
            dispatch(fetchPacksTC())
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}
export const updatedPackTC = (_id: string, name: string) => (dispatch:TypedDispatch) => {
    dispatch(loading(true))
    packsAPI.updatedPack({_id, name})
        .then((res) => {
            dispatch(updatedPackAC(res.data.updatedCardsPack))
            dispatch(fetchPacksTC())
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
    deckCover: string
}
export type ResponsePacksType = SortPacksType & {
    cardPacks: ResponsePackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
type SortPacksType = {
    sortPacks: string
}
export type fetchPacksActionType = ReturnType<typeof fetchPacksAC>
export type createPackActionType = ReturnType<typeof createPackAC>
export type deletePackActionType = ReturnType<typeof deletePackAC>
export type updatePackActionType = ReturnType<typeof updatedPackAC>
export type setSortPacksActionType = ReturnType<typeof setSortPacksAC>
export type setSearchPackActionType = ReturnType<typeof setSearchPackAC>
export type setPagePacksActionType = ReturnType<typeof setPagePacksAC>
export type setNumbersPacksActionType = ReturnType<typeof setNumbersPacksAC>


export type PacksActionsType = fetchPacksActionType
    | createPackActionType
    | deletePackActionType
    | updatePackActionType
    | setSortPacksActionType
    | setSearchPackActionType
    | setPagePacksActionType
    | setNumbersPacksActionType

