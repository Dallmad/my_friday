import axios, {AxiosResponse} from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registrationAPI = {
    registration( obj: RegistrationType) {
        return instance.post<{ obj: RegistrationType}, AxiosResponse<any>>('auth/register', obj);
    }
}

export type RegistrationType = {
    email: string
    password: string
}
