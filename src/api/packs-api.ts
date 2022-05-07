import {AxiosResponse} from 'axios'
import {instance} from './instance';
import {ResponsePacksType, ResponsePackType} from '../state/packs-reducer';


const params : GetParamsRequestType = {
    packName: 'React',
    min: 1,
    max: 10,
    sortPacks: '0updated',
    page: 1,
    pageCount: 3,
}

export const packsAPI = {
    getPacks() {
        return instance.get<GetParamsRequestType,AxiosResponse<ResponsePacksType>>('cards/pack', {params});
    },
    createPack(cardsPack: RequestCreatePackType) {
        return instance.post<{ cardsPack: RequestCreatePackType }, AxiosResponse<ResponseToCreatePackType>>('cards/pack',{cardsPack})
    },
    deletePack(_id: string) {
        return instance.delete<{_id: string },AxiosResponse<ResponseDeletePackType>>(`cards/pack?${_id}`)
    },
    updatedPack(cardsPack: RequestUpdatedPackType) {
        return instance.put<{ cardsPack: RequestUpdatedPackType }, AxiosResponse<ResponseUpdatedPackType>>('cards/pack', {cardsPack})
    }
}

//types
type GetParamsRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type RequestCreatePackType = {
    name?: string
    deckCover?: string
    private?: boolean
}
type ResponseToCreatePackType = {
    newCardsPack: ResponsePackType
    token: string
    tokenDeathTime: number
}
type ResponseDeletePackType = {
    deletedCardsPack: ResponsePackType
    token: string
    tokenDeathTime: number
}
type ResponseUpdatedPackType = {
    updatedCardsPack: ResponsePackType
    token: string
    tokenDeathTime: number
}
export type RequestUpdatedPackType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name?: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
    deckCover?: string
}