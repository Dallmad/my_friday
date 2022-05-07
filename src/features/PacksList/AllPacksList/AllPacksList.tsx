import {Navigate} from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {useState} from 'react';
import Input from '../../../components/Input/Input';
import {Table} from './Table/Table';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../state/store';
import {ResponsePacksType, ResponsePackType} from '../../../state/packs-reducer';

export const AllPacksList = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const [changePage, setChangePage] = useState<boolean>(false)

    const changePageToMyPacks = () => {
        setChangePage(true)
    }
    const changePageToAllPacks = () => {
        setChangePage(false)
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <div>
                <h4>Show packs cards</h4>
                <Button onClick={changePageToMyPacks}>
                    My
                </Button>
                <Button onClick={changePageToAllPacks}>
                    All
                </Button>
                <p>
                    Number of cards
                </p>
                <h2>Packs list</h2>
                <Input/>
                <Button>Search</Button>
                <Button>Add new pack</Button>
            </div>
            {changePage ? <Table changePage={changePage}/> : <Table changePage={changePage}/>}
        </>
    )
}