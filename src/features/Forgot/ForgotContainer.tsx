import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {forgotTC} from "../../state/forgot-reducer";
import {Forgot} from "./Forgot";
import {AppRootStateType} from "../../state/store";
import {Preloader} from "../../components/Preloader/Preloader";

const ForgotContainer = React.memo(() => {

    const [email, setEmail] = useState<string>('')

    const dispatch = useDispatch();
    const forgotCallback = useCallback(
        () => dispatch(forgotTC(email)),
        [email, dispatch]
    );

    const loading = useSelector((store: AppRootStateType) => store.forgot);


    return (
        <div>
            <Forgot email={email} setEmail={setEmail} forgot={forgotCallback}/>
        </div>
    );
});

export default ForgotContainer;