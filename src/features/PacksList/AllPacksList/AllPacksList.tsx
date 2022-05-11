import {Navigate, useNavigate} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../../state/store';
import {
    createPackTC,
    setPagePacksAC,
    setSearchPackAC
} from '../../../state/packs-reducer';
import {Paginator} from '../../../components/Paginator/Paginator';
import {PATH} from '../../../app/Routes/Routes';


export const AllPacksList = () => {

    const dispatch = useTypedDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const [searchPacks, setSearchPacks] = useState('')
    const [currentPage, setCurrentPage] = useState(page)

const navigate = useNavigate()

    const changePageToMyHandler = () => {
        navigate(`${PATH.MY_PACKS_LIST}/${userId}`)
    }
    const changePageToAllHandler = () => {
        navigate(`${PATH.ALL_PACKS_LIST}`)
    }

    const searchPacksHandler = () => {
        dispatch(setSearchPackAC(searchPacks))
        setSearchPacks('')
    }
    const addNewPackHandler = (title:string) => {
        dispatch(createPackTC(title))
        setSearchPacks('')
    }
    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(setPagePacksAC(pageNumber))
    }
    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
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
            <Table currentPage={currentPage} totalCount={cardPacksTotalCount}/>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalCount={cardPacksTotalCount}
                pageSize={pageCount}/>
        </div>
    )
}
