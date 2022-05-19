import React, {useCallback, useEffect, useState} from 'react';
import {Forgot} from "./Forgot";
import {forgotTC} from "../../state/forgot-reducer";
import {AppRootStateType, useTypedDispatch} from "../../state/store";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ForgotContainer = React.memo(() => {

    // const check = useSelector<AppRootStateType, boolean>(state => state.forgot.check)

    const [email, setEmail] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    let navigate = useNavigate();

    const dispatch = useTypedDispatch();
    const forgotCallback = useCallback(
        () => dispatch(forgotTC(email, setCheck)),
        [email, dispatch]
    );

    useEffect(() => {
        if (check){
            return navigate('/check_email');
        }
    },[check]);


    return (
        <div>
            <Forgot email={email}
                    setEmail={setEmail}
                    forgot={forgotCallback}/>
        </div>
    );
});

export default ForgotContainer;