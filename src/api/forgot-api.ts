import {instance} from "./instance";

export type ForgotDataType = {
    error: string
}

export const ForgotAPI = {
    forgot(email: string)  {
        return instance.post<ForgotDataType>("/auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `
            <div style="background-color: lime; padding: 15px">
                password recovery link: 
                <a href='http://https://Dallmad.github.io/my_friday/#/set-new-password/$token$'>link</a>
            </div>
`
        });
    },
};