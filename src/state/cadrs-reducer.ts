import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from "./registration-reducer";
import {cardsAPI} from "../api/cards-api";
import {AppRootStateType, TypedDispatch} from "./store";

const SET_USER = 'cards/SET_USER'

const initialState = {
    cards: [
        {
            // answer: "no answer",
            // question: "no question",
            // cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            // grade: 4.987525071790364,
            // shots: 1,
            // user_id: "142151531535151",
            // created: "2020-05-13T11:05:44.867Z",
            // updated: "2020-05-13T11:05:44.867Z",
            // _id: "5ebbd48876810f1ad0e7ece3",
        },
        {
            // answer: "222",
            // question: "222",
            // cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            // grade: 4,
            // shots: 12,
            // user_id: "1421515315351512",
            // created: "2020-05-13T11:05:44.867Z",
            // updated: "2020-05-13T11:05:44.867Z",
            // _id: "5ebbd48876810f1ad0e7ece32",
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "",
    cardsPack_id: '627628a08c77230004880ae3',
}

export const cardsReducer = (state: InitialStateType = initialState, action:
    CardsActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.state,
            }
        default:
            return state
    }
}

// actions
export const setCardsAC = (state: InitialStateType) =>
    ({type: SET_USER, state} as const)

// thunk
export const setCardsTC = () => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    dispatch(loading(true))
    let cardsPack_id = getState().cards.cardsPack_id
    cardsAPI.getCards(cardsPack_id)
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

export const addCardTC = () => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    cardsAPI.updateCards()
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsTC())
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

export const deleteCardTC = (id: string) => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    cardsAPI.deleteCards(id)
        .then(res => {
            dispatch(loading(false))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

export const editCardTC = (id: string) => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    cardsAPI.editCards(id)
        .then(res => {
            dispatch(loading(false))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

// types
type InitialStateType = typeof initialState
export type CardsActionsType = ReturnType<typeof setCardsAC>
export type CardType = {
    answer: string
    question: string
    cardsPack_id?: string
    grade: number
    shots?: number
    user_id?: string
    created?: Date
    updated: Date
    _id?: string
}
