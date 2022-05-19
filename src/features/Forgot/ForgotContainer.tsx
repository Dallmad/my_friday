import React, {useCallback, useState} from 'react';
import {Forgot} from "./Forgot";
import {forgotTC} from "../../state/forgot-reducer";
import {useTypedDispatch} from "../../state/store";

const ForgotContainer = React.memo(() => {

    const [email, setEmail] = useState<string>('')

    const dispatch = useTypedDispatch();
    const forgotCallback = useCallback(
        () => dispatch(forgotTC(email)),
        [email, dispatch]
    );


    return (
        <div>
            <Forgot email={email}
                    setEmail={setEmail}
                    forgot={forgotCallback}/>
        </div>
    );
});

export default ForgotContainer;