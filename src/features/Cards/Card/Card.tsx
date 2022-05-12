import React, {FC} from 'react';
// import s from './Card.module.css'
import {CardType} from "../../../state/cadrs-reducer";
import Button from "../../../components/Button/Button";

type PropsType = {
    deleteCard: (_id: any) => void
    editCard: (_id: any) => void
} & CardType

export const Card: FC<PropsType> = ({
                                        answer,
                                        question,
                                        grade,
                                        updated,
                                        _id,
                                        ...props
                                    }) => {


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

