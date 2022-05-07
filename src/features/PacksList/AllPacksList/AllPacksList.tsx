import {Navigate, NavLink, useParams} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../../state/store';
import {fetchParamsTC} from '../../../state/params-reducer';

export const AllPacksList = () => {

/*
    const params = useParams<'*'>()

    const queryParametr = params['*']

    const s = queryParametr?.split('&')
*/

    const dispatch = useTypedDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const [searchPacks, setSearchPacks] = useState('')

    const searchPacksHandler = () => {
        dispatch(fetchParamsTC(searchPacks))
        setSearchPacks('')
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <div>
                <h4>Show packs cards</h4>
                <NavLink to={'/my-packs-list'}>My</NavLink>
                <NavLink to={'/all-packs-list'}>All</NavLink>
                <p>
                    Number of cards
                </p>
                <h2>Packs list</h2>
                <Input value={searchPacks} onChange={(e)=>setSearchPacks(e.currentTarget.value)}/>
                <Button onClick={searchPacksHandler}>Search</Button>
                <Button>Add new pack</Button>
            </div>
            <Table/>
        </>
    )
}