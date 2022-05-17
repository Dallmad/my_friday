import React from 'react';
import Input from "../../components/Input/Input";


type ForgotPropsType = {
    email: string;
    setEmail: (email:string) => void;
    forgot: () => void
}

export const Forgot: React.FC<ForgotPropsType> = React.memo(({email, setEmail, forgot}) => {

    return (
        <div>
            <div><Input value={email} onChangeText={setEmail}/></div>
            <button onClick={forgot}></button>
        </div>
    );
})