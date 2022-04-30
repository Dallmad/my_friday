import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
    },
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>('auth/me')
    }
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string;
}
