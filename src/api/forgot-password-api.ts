import {AxiosResponse} from 'axios'
import {instance} from './instance';

export const forgotPasswordAPI = {
    forgot( obj: ForgotPasswordType) {
        return instance.post<{ obj: ForgotPasswordType}, AxiosResponse<any>>('auth/forgot', obj);
    }
}

//types
export type ForgotPasswordType = {
    email: string
    // from: string
    // message: string
}
