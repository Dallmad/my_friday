import {instance} from "./instance";


export type RegisterDataType = {
    error: string;
}

export const NewPassAPI = {
    setPass: async (resetPasswordToken: any, newPassword: string) => {
        const response = await instance.post<RegisterDataType>(
            "/auth/set-new-password",
            {
                password: newPassword,
                resetPasswordToken: resetPasswordToken
            }
        );

        return response.data;
    },

};
