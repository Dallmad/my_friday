import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';
import {createPackTC, fetchMyPacksTC, fetchPacksTC, ResponsePackType} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';
import  '../AllPacksList.module.css'


export const Table = () => {

    const dispatch = useTypedDispatch()
    const isMyPage = useSelector<AppRootStateType, boolean>(state => state.packs.isMyPage)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.packs.sortPacks)


    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)

    useEffect(() => {
        if (!isMyPage) {
            dispatch(fetchPacksTC())
        } else dispatch(fetchMyPacksTC(userId))
    }, [isMyPage, sortPacks])

    return (
        <div>
            <table className='table'>
            <thead>
                <TableHeader sortPacks={sortPacks}/>
            </thead>
            <tbody>
                {packs.map((p) =>
                    <TableRow
                        key={p._id + p.user_id}
                        cardPacks={p}
                        //_id={p._id}
                    />
                )}
            </tbody>
            </table>
        </div>
    )
}
