import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<any>('cards/card/', {
            params: {
                // cardAnswer: 'english',
                // cardQuestion: 'english',
                cardsPack_id: cardsPack_id,
                // min: 1,
                // max: 4,
                // sortCards: '0grade',
                // page: 1,
                // pageCount: 7
            }
        })
    },
    updateCards() {
        return instance.post<AxiosResponse<ResponseType>>('cards/card/', {
            card: {
                cardsPack_id: "627628a08c77230004880ae3",
                question: 'MikolaiQuestion',
                answer: 'MikolaiAnswer'
            }
        });
    },
    deleteCards(id: string) {
        return instance.delete<AxiosResponse<ResponseType>>('cards/card/?id=' + id);
    },
    editCards(id: string) {
        return instance.put<AxiosResponse<ResponseType>>('cards/card/', {
            card: {
                _id: id,
                question: "edit question"
            }
        });
    },
}

//types

