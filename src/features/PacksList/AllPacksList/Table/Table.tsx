import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import React, {useEffect} from 'react';
import {fetchPacksTC, ResponsePackType} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';
import '../AllPacksList.module.css'
import {useParams} from 'react-router-dom';

type PropsType = {
    currentPage: number
    totalCount: number
}

export const Table = ({currentPage, totalCount}: PropsType) => {

    const dispatch = useTypedDispatch()

    const sortPacks = useSelector<AppRootStateType, string>(state => state.packs.sortPacks)
    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)


    const {user_id} = useParams()

    useEffect(() => {
        dispatch(fetchPacksTC(user_id))
    }, [sortPacks, currentPage, totalCount, user_id,minCardsCount,maxCardsCount])

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
