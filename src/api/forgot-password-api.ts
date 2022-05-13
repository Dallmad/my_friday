import {instance} from './instance';

export const forgotAPI = {
    forgot( email: string ) {
        return instance.post('auth/register', {

            email, // кому восстанавливать пароль
            from: "test-front-admin <ai73a@yandex.by>",
            // можно указать разработчика фронта)
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='http://localhost:3000/#/set-new-password/$token$'>
                        link</a>
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

        });
    }
}
