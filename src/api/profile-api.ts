import {AxiosResponse} from 'axios'
import {instance} from './instance';
import {ResponseUserType} from './auth-api';

export const profileAPI = {
    changeUserName( name: string) {
        return instance.put<{ name: string }, AxiosResponse<ResponseUserType>>('auth/me', {name});
    }
}
