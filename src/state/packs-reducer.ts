import {Dispatch} from 'redux';
import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from './registration-reducer';
import {packsAPI, RequestCreatePackType, RequestUpdatedPackType} from '../api/packs-api';
import {AppActionType, AppDispatch, AppRootStateType, TypedDispatch} from './store';
import {ThunkDispatch} from 'redux-thunk';


const FETCH_PACKS = 'packs/FETCH_PACKS'
const CREATE_PACK = 'packs/CREATE_PACK'
const DELETE_PACK = 'packs/DELETE_PACK'
const UPDATED_PACK = 'packs/UPDATED_PACK'
const SET_IS_MY_PAGE = 'packs/SET_IS_MY_PAGE'
const SET_SORT_PACKS = 'packs/SET_SORT_PACKS'


const initialState = {
    cardPacks: [],
    page: 1,
    pageCount: 8,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 5,
    token: '',
    tokenDeathTime: 0,
    isMyPage: false,
    sortPacks: '0updated',
}

export const packsReducer = (state: ResponsePacksType = initialState, action: PacksActionsType): ResponsePacksType => {
    switch (action.type) {
        case FETCH_PACKS:
            return {...state, cardPacks: action.packs.map(p => ({...p}))}
        case CREATE_PACK:
            return {...state, ...action.cardsPack}
        case DELETE_PACK:
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action._id)}
        case UPDATED_PACK:
            return {...state, ...action.cardsPack}
        case SET_IS_MY_PAGE:
            return {...state, isMyPage: action.value}
        case SET_SORT_PACKS:
            return {...state, sortPacks: action.sortPacks}
        default:
            return state
    }
}

// actions
export const fetchPacksAC = (packs: ResponsePackType[]) => ({type: FETCH_PACKS, packs} as const)
export const createPackAC = (cardsPack: RequestCreatePackType) => ({type: CREATE_PACK, cardsPack} as const)
export const deletePackAC = (_id: string) => ({type: DELETE_PACK, _id} as const)
export const updatedPackAC = (cardsPack: RequestUpdatedPackType) => ({type: UPDATED_PACK, cardsPack} as const)
export const setIsMyPageAC = (value: boolean) =>
    ({type: SET_IS_MY_PAGE, value} as const)
export const setSortPacksAC = (sortPacks: string) =>
    ({type: SET_SORT_PACKS, sortPacks} as const)

// thunk
export const fetchPacksTC = () => (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {
    let sortPacks = getState().packs.sortPacks
    let page = getState().packs.page
    let pageCount = getState().packs.pageCount
    dispatch(loading(true))
    packsAPI.getPacks({sortPacks,page,pageCount})
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
export const fetchMyPacksTC = (userId: string) => (dispatch: Dispatch<AppActionType>, getState: () => AppRootStateType) => {
    let sortPacks = getState().packs.sortPacks
    let page = getState().packs.page
    let pageCount = getState().packs.pageCount
    dispatch(loading(true))
    packsAPI.getPacks({user_id: userId,sortPacks,page,pageCount})
        .then((res) => {
            dispatch(fetchPacksAC(
                res.data.cardPacks//.filter(c=> c.user_id===userId)
            ))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}
export const createPackTC = (name?: string, deckCover?: string) => (dispatch: Dispatch<AppActionType>) => {
    dispatch(loading(true))
    packsAPI.createPack
    ({name, deckCover, private: false})
        .then((res) => {
            dispatch(createPackAC(res.data.newCardsPack))
            dispatch(fetchPacksTC() as any )
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}

export const deletePackTC = (_id: string) => (dispatch: Dispatch<AppActionType>) => {
    dispatch(loading(true))
    packsAPI.deletePack(_id)
        .then((res) => {
            dispatch(deletePackAC(res.data.deletedCardsPack._id))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
        })
        .finally(() => {
            dispatch(loading(false))
        })
}
export const updatedPackTC = (cardsPack: RequestUpdatedPackType) => (dispatch: Dispatch<AppActionType>) => {
    dispatch(loading(true))
    packsAPI.updatedPack(cardsPack)
        .then((res) => {
            dispatch(updatedPackAC(res.data.updatedCardsPack))
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
export type ResponsePacksType = {
    cardPacks: ResponsePackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
} & IsMyPageType
type IsMyPageType = {
    isMyPage: boolean
    sortPacks: string
}
//export type initialStateType = typeof initialState
export type fetchPacksActionType = ReturnType<typeof fetchPacksAC>
export type createPackActionType = ReturnType<typeof createPackAC>
export type deletePackActionType = ReturnType<typeof deletePackAC>
export type updatePackActionType = ReturnType<typeof updatedPackAC>
export type setIsMyPageActionType = ReturnType<typeof setIsMyPageAC>
export type setSortPacksActionType = ReturnType<typeof setSortPacksAC>

//export type fetchPacksTCAT = ReturnType<typeof setSortPacksAC>

export type PacksActionsType = fetchPacksActionType
    | createPackActionType
    | deletePackActionType
    | updatePackActionType
    | setIsMyPageActionType
    | setSortPacksActionType
    //| fetchPacksTCAT