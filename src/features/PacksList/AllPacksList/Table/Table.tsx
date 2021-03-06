import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import React, {useEffect} from 'react';
import {fetchPacksTC, ResponsePackType} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';
import '../AllPacksList.module.css'
import {useParams} from 'react-router-dom';

export const Table = ({currentPage}: TablePropsType) => {

    const dispatch = useTypedDispatch()
    const {user_id} = useParams()

    const sortPacks = useSelector<AppRootStateType, string>(state => state.packs.sortPacks)
    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(fetchPacksTC(user_id))
    }, [sortPacks, currentPage, user_id])

    return (
        <div>
            <table className="table">
                <thead>
                <TableHeader sortPacks={sortPacks}/>
                </thead>
                <tbody>
                {packs.map((p) =>
                    <TableRow
                        key={p._id + p.user_id}
                        cardPacks={p}
                    />
                )}
                </tbody>
            </table>
        </div>
    )
}

//types
type TablePropsType = {
    currentPage: number
    totalCount: number
}