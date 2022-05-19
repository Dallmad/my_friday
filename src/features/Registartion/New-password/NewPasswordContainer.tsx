import React, {useCallback, useEffect, useState} from 'react';
import {NewPassword} from "./NewPassword";
import {useTypedDispatch} from "../../../state/store";
import {useParams} from "react-router-dom";
import {newPasswordTC} from "../../../state/new-password-reducer";
import { useNavigate } from "react-router-dom";



export const NewPasswordContainer = React.memo(() => {

    let navigate = useNavigate();

    const [newPassword, setNewPassword] = useState<string>('')
    const [loginPage, setLoginPage] = useState(false)

    const params = useParams<'*'>()
    const resetPasswordToken = params["*"]
    console.log(resetPasswordToken)

    const dispatch = useTypedDispatch();
    const newPasswordCallback = useCallback(
        () =>
            dispatch(newPasswordTC(resetPasswordToken, newPassword, setLoginPage)),
        [newPassword, dispatch]
    );

    useEffect(() => {
        if (loginPage){
            return navigate('/login');
        }
    },[loginPage]);



    return (
        <div>
            <NewPassword newPassword={newPassword}
                         setNewPassword={setNewPassword}
                         newPasswordCallback={newPasswordCallback}/>
        </div>
    );
});
