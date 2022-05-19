import {instance} from "./instance";


export type RegisterDataType = {
    error: string
}

export const NewPasswordAPI = {
    setPass(resetPasswordToken: any, newPassword: string) {
        return instance.post<RegisterDataType>(
            "/auth/set-new-password",
            {
                password: newPassword,
                resetPasswordToken: resetPasswordToken
            }
        )
    }
}
