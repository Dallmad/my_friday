import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseUserType>>('auth/login', data)
    },
    me() {
        return instance.post<ResponseUserType>('auth/me')
    },
    logout() {
        return instance.delete<ResponseUserType>('auth/me')
    }
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseUserType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: DateConstructor
    updated: DateConstructor
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
