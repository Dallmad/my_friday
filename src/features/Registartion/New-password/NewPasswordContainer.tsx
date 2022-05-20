import React, {useCallback, useState} from 'react';
import {NewPassword} from "./NewPassword";
import {useTypedDispatch} from "../../../state/store";
import {useParams} from "react-router-dom";
import {newPasswordTC} from "../../../state/new-password-reducer";


export const NewPasswordContainer = React.memo(() => {

    const [newPassword, setNewPassword] = useState<string>('')

    const params = useParams<'*'>()
    const resetPasswordToken = params["*"]
    console.log(resetPasswordToken)

    const dispatch = useTypedDispatch();
    const newPasswordCallback = useCallback(
        () =>
            dispatch(newPasswordTC(resetPasswordToken, newPassword)),
        [newPassword, dispatch]
    );

    return (
        <div>
            <NewPassword newPassword={newPassword}
                         setNewPassword={setNewPassword}
                         newPasswordCallback={newPasswordCallback}/>
        </div>
    );
});