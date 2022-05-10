import {Navigate} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../../state/store';

import {createPackTC, setIsMyPageAC, setSearchPackAC} from '../../../state/packs-reducer';

export const AllPacksList = () => {

    /*
        const params = useParams<'*'>()

        const queryParametr = params['*']

        const s = queryParametr?.split('&')
    */

    const dispatch = useTypedDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const [searchPacks, setSearchPacks] = useState('')

    const changePageToMyHandler = () => {
        dispatch(setIsMyPageAC(true))
    }
    const changePageToAllHandler = () => {
        dispatch(setIsMyPageAC(false))
    }

    const searchPacksHandler = () => {
        dispatch(setSearchPackAC(searchPacks))
        setSearchPacks('')
    }
    const addNewPackHandler = (title:string) => {
        dispatch(createPackTC(title))
        setSearchPacks('')
    }
    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <div>
                <h4>Show packs cards</h4>
                <Button onClick={changePageToMyHandler}>My</Button>
                <Button onClick={changePageToAllHandler}>All</Button>
                <p>
                    Number of cards
                </p>
                <h2>Packs list</h2>
                <Input value={searchPacks} onChange={(e) => setSearchPacks(e.currentTarget.value)}/>
                <Button onClick={searchPacksHandler}>Search</Button>
                <Button onClick={()=>addNewPackHandler(searchPacks)}>Add new pack</Button>
            </div>
            <Table/>
        </>
    )
}