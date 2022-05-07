import {AxiosResponse} from 'axios'
import {instance} from './instance';
import {ResponsePacksType} from '../state/packs-reducer';


const params : ParamsType = {
    packName: 'english',
    min: 3,
    max: 10,
    sortPacks: '0updated',
    page: 1,
    pageCount: 5,
}

export const packsAPI = {
    getPacks() {
        return instance.get<any,AxiosResponse<ResponsePacksType>>('cards/pack', {params: params});
    }
}

//types
type ParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}