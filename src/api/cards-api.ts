import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const cardsAPI = {
    getCards(params: any) {
        return instance.get<any>('cards/card/', {params})
    },
    addCard(card: any) {
        return instance.post<AxiosResponse<ResponseType>>('cards/card/', {card});
    },
    deleteCard(id: string) {
        return instance.delete<AxiosResponse<ResponseType>>('cards/card/?id=' + id);
    },
    editCard(card: any) {
        return instance.put<AxiosResponse<ResponseType>>('cards/card/', {card});
    },
}

//types

