import s from '../../AllPacksList.module.css';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import React from 'react';

export const NumberCardsPage = () => {
    return (
        <>
            <h4 className={s.secondH4}>
                Number of cards
                <Button>Apply</Button>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
            </h4>
        </>
    )
}