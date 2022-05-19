import React from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";


type ForgotPropsType = {
    email: string;
    setEmail: (email: string) => void;
    forgot: () => void
}

export const Forgot: React.FC<ForgotPropsType> = React.memo(({email, setEmail, forgot}) => {

    return (
        <div>
            <Input value={email}
                   onChangeText={setEmail}/>
            <Button callBack={forgot}
                    buttonName={'Send'}/>
        </div>
    );
})