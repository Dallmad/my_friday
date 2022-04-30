import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const registrationAPI = {
    registration( obj: RegistrationType) {
        return instance.post<{ obj: RegistrationType}, AxiosResponse<any>>('auth/register', obj);
    }
}

//types
export type RegistrationType = {
    email: string
    password: string
}
