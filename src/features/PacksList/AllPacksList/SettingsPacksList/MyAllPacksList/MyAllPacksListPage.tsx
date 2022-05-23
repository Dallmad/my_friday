import Button from '../../../../../components/Button/Button';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../../state/store';


export const MyAllPacksListPage = () => {

    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    const navigate = useNavigate()

    const changePageToMyHandler = () => {
        console.log(`${PATH.MY_PACKS_LIST}/${userId}`)
        navigate(`${PATH.MY_PACKS_LIST}/${userId}`)
    }
    const changePageToAllHandler = () => {
        navigate(`${PATH.ALL_PACKS_LIST}`)
    }
    return (
        <>
            <h4>Show packs cards</h4>
            <div>
                <Button onClick={changePageToMyHandler}>My</Button>
                <Button onClick={changePageToAllHandler}>All</Button>
            </div>
        </>

    )
}