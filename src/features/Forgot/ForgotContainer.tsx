import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {Forgot} from "./Forgot";

const ForgotContainer = React.memo(() => {

    const [email, setEmail] = useState<string>('')

    const dispatch = useDispatch();
    // const forgotCallback = useCallback(
    //     () => dispatch(forgotTC(email)),
    //     [email, dispatch]
    // );


    return (
        <div>
            {/*<Forgot email={email} setEmail={setEmail} forgot={forgotCallback}/>*/}
        </div>
    );
});

export default ForgotContainer;