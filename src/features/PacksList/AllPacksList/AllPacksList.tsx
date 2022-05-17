import {Navigate} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType, useTypedDispatch} from '../../../state/store';
import {
    createPackTC, fetchPacksTC,
    setPagePacksAC,
    setSearchPackAC
} from '../../../state/packs-reducer';
import {Paginator} from '../../../components/Paginator/Paginator';
import s from './AllPacksList.module.css'
import {MyAllPacksListPage} from './SettingsPacksList/MyAllPacksList/MyAllPacksListPage';
import {NumberCardsPage} from './SettingsPacksList/NumberCardsSetting/NumberCardsPage';
import {Modal} from "../../../components/Modal/Modal";


export const AllPacksList = () => {

    const dispatch = useTypedDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const lastSearch = useSelector<AppRootStateType, string>(state => state.packs.packName)

    const [searchPacks, setSearchPacks] = useState(lastSearch ? lastSearch : '')
    const [newPack, setNewPack] = useState('')
    const [currentPage, setCurrentPage] = useState(page)
    const [showModal, setShowModal] = useState(false);

    const searchPacksHandler = () => {
        dispatch(setSearchPackAC(searchPacks))
        dispatch(fetchPacksTC())
    }
    const addNewPackHandler = (title: string) => {
        dispatch(createPackTC(title))
        setNewPack('')
    }
    const editShowModal = (value: boolean) => {
        setShowModal(value)
    }
    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        dispatch(setPagePacksAC(pageNumber))
    }
    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.container}>
            <div className={s.settingsPacks}>
                <MyAllPacksListPage/>
                <NumberCardsPage/>
            </div>
            <div>
                <h2>Packs list</h2>
                <Input value={searchPacks} onChange={(e) => setSearchPacks(e.currentTarget.value)}/>
                <Button onClick={searchPacksHandler}>Search</Button>
                <Button onClick={() => editShowModal(true)}>Add new pack</Button>
                <Modal editShowModal={editShowModal} showModal={showModal}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Add new pack
                        </div>
                        <Input value={newPack} onChange={(e) => setNewPack(e.currentTarget.value)}/>
                        <div className={s.containerBtn}>
                                <Button onClick={() => editShowModal(false)}>cancel</Button>
                                <Button onClick={() => addNewPackHandler(newPack)}>save</Button>
                        </div>
                    </div>
                </Modal>

                <Table currentPage={currentPage} totalCount={cardPacksTotalCount}/>
                <Paginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalCount={cardPacksTotalCount}
                    pageSize={pageCount}/>
            </div>
        </div>
    )
}
