import React from 'react';
import s from './NewPassword.module.css'
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

type NewPasswordType = {
    newPassword: string
    setNewPassword: (newPassword: string) => void
    newPasswordCallback: () => void
}

export const NewPassword: React.FC<NewPasswordType> = React.memo((
    {newPassword, setNewPassword, newPasswordCallback}) => {
    return (
        <div>
            <div className={s.div}>
                Create new Password
                <Input value={newPassword}
                       onChangeText={setNewPassword}/>
                <Button callBack={newPasswordCallback}
                        buttonName={'Create'}/>
            </div>
        </div>
    );
});