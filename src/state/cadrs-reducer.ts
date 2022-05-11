import {handleServerNetworkError} from '../utils/error-utils';
import {loading} from "./registration-reducer";
import {cardsAPI} from "../api/cards-api";
import {AppRootStateType, TypedDispatch} from "./store";

const SET_USER = 'cards/SET_USER'
const SET_PAGE = 'cards/SET_PAGE'
const SET_SORT = 'cards/SET_SORT'
const SET_SEARCH_ANSWER = 'cards/SET_SEARCH_ANSWER'
const SET_SEARCH_QUESTION = 'cards/SET_SEARCH_QUESTION'

const initialState = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    cardsPack_id: '',
    sortCards: '0grade',
}

export const cardsReducer = (state: InitialStateType = initialState, action:
    CardsActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.state
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.page,
            }
        case SET_SORT:
            return {
                ...state,
                sortCards: action.sortCards,
            }
        case SET_SEARCH_ANSWER:
            return {
                ...state,
                cards: state.cards.filter((card: CardType)  => !!(card.answer.search(action.title)+1) )
            }
        case SET_SEARCH_QUESTION:
            return {
                ...state,
                cards: state.cards.filter((card: CardType)  => !!(card.question.search(action.title)+1) )
            }
        default:
            return state
    }
}

// actions
export const setCardsAC = (state: InitialStateType) =>
    ({type: SET_USER, state} as const)

export const setPageCardsAC = (page: number) =>
    ({type: SET_PAGE, page} as const)

export const setSortCardsAC = (sortCards: string) =>
    ({type: SET_SORT, sortCards} as const)

export const setSearchCardsAnswerAC = (title: string) =>
    ({type: SET_SEARCH_ANSWER, title} as const)

export const setSearchCardsQuestionAC = (title: string) =>
    ({type: SET_SEARCH_QUESTION, title} as const)

// thunk
export const setCardsTC = () => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    dispatch(loading(true))
    let cardsPack_id = getState().cards.cardsPack_id
    let sortCards = getState().cards.sortCards
    let page = getState().cards.page
    let pageCount = getState().cards.pageCount

    cardsAPI.getCards({cardsPack_id, page, pageCount, sortCards})
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}
export const setCardsIdTC = (cardsPack_id?:string) => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    dispatch(loading(true))
    let id=(cardsPack_id ? cardsPack_id :getState().cards.cardsPack_id)
    let sortCards = getState().cards.sortCards
    let page = getState().cards.page
    let pageCount = getState().cards.pageCount

    cardsAPI.getCards({cardsPack_id:id, page, pageCount, sortCards})
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

export const addCardTC = () => (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
    dispatch(loading(true))
    let cardsPack_id = getState().cards.cardsPack_id
    cardsAPI.addCard({cardsPack_id, question: "new question", answer: "new answer", grade: 3})
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
    cardsAPI.deleteCard(id)
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsTC())
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

export const editCardTC = (id: string) => (dispatch: TypedDispatch) => {
    dispatch(loading(true))
    cardsAPI.editCard({_id: id, question: "new edit question"})
        .then(res => {
            dispatch(loading(false))
            dispatch(setCardsTC())
        })
        .catch(error => {
            handleServerNetworkError(error.response.data.error, dispatch)
            dispatch(loading(false))
        })
}

// types
type InitialStateType = typeof initialState
export type CardsActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setPageCardsAC>
    | ReturnType<typeof setSortCardsAC>
    | ReturnType<typeof setSearchCardsAnswerAC>
    | ReturnType<typeof setSearchCardsQuestionAC>
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
