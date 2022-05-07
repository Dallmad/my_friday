import React, {FC} from 'react';
// import s from './Card.module.css'
import {CardType} from "../../../state/cadrs-reducer";
import Button from "../../../components/Button/Button";

export const Card: FC<CardType&{deleteCard: any, editCard: any}> = ({answer, question, grade, updated, _id, ...props}) => {



    return (
        <tr>
            <td>{answer}</td>
            <td>{question}</td>
            <td>{grade}</td>
            <td>{updated ? updated.toString() : '---'}</td>
            <td>
                <Button onClick={() => props.deleteCard(_id)}>Delete</Button>
                <Button onClick={() => props.editCard(_id)}>Edit</Button>
            </td>
        </tr>
    );
};

