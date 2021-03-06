import {AxiosResponse} from 'axios'
import {instance} from './instance';
import {CardType, InitialStateType} from '../state/cadrs-reducer';

export const cardsAPI = {
    getCards(params: GetParamsRequestType) {
        return instance.get<GetParamsRequestType,AxiosResponse<InitialStateType>>('cards/card/', {params})
    },
    addCard(card: RequestAddCardType) {
        return instance.post<AxiosResponse<ResponseType>>('cards/card/', {card});
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse<ResponseType>>('cards/card/?id=' + id);
    },
    editCard(card: RequestEditCardType) {
        return instance.put<AxiosResponse<ResponseType>>('cards/card/', {card});
    },
    editGradeCard(grade: number, card_id: string) {
        return instance.put<AxiosResponse<ResponseType>>('cards/grade/', {grade,card_id})
    }
}

//types
type GetParamsRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
type RequestAddCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
}
type RequestEditCardType = {
    _id: string
    question: string
    answer: string
}
