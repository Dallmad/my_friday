import s from '../../AllPacksList.module.css';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import React, {useState} from 'react';
import {setNumbersPacksAC} from '../../../../../state/packs-reducer';
import {useTypedDispatch} from '../../../../../state/store';

export const NumberCardsPage = () => {

    const dispatch = useTypedDispatch()

    const [minCardsCount,setMinCardsCount] = useState<number | string>(0)
    const [maxNumberCards,setMaxNumberCards] = useState<number | string>(5)

    const applySettings = () => {
        dispatch(setNumbersPacksAC(+minCardsCount,+maxNumberCards))
    }

    return (
        <>
            <h4 className={s.secondH4}>
                Number of cards
                <Button onClick={applySettings}>Apply</Button>
                <div>
                    <Input value={minCardsCount} onChange={(e)=>setMinCardsCount(e.currentTarget.value)}/>
                </div>
                <div>
                    <Input value={maxNumberCards} onChange={(e)=>setMaxNumberCards(e.currentTarget.value)}/>
                </div>
            </h4>
        </>
    )
}
