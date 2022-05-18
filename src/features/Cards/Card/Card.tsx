import React, {FC, useState} from 'react';
import s from './Card.module.css'
import {CardType, deleteCardTC, editCardTC} from "../../../state/cadrs-reducer";
import Button from "../../../components/Button/Button";
import {Modal} from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import {useTypedDispatch} from "../../../state/store";



export const Card: FC<CardType> = ({  answer, question, grade, updated, _id,  ...props}) => {

    const dispatch = useTypedDispatch()

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [editTitleQuestion, setEditTitleQuestion] = useState(question)
    const [editTitleAnswer, setEditTitleAnswer] = useState(answer)

    const editShowModalDelete = (value: boolean) => {
        setShowModalDelete(value)
    }

    const editShowModalEdit = (value: boolean) => {
        setShowModalEdit(value)
    }

    const deleteCard = () => {
        dispatch(deleteCardTC(_id))
    }

    const editCard = (editTitleQuestion: string, editTitleAnswer: string) => {
        dispatch(editCardTC(_id, editTitleQuestion, editTitleAnswer))
    }

    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{grade}</td>
            <td>{updated ? updated.toString() : '---'}</td>
            <td>
                <Button onClick={() => editShowModalDelete(true)}>Delete</Button>
                <Modal editShowModal={editShowModalDelete} showModal={showModalDelete}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Delete card
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => setShowModalDelete(false)}>cancel</Button>
                            <Button onClick={() => deleteCard()}>delete</Button>
                        </div>
                    </div>
                </Modal>

                <Button onClick={() => editShowModalEdit(true)}>Edit</Button>
                <Modal editShowModal={editShowModalEdit} showModal={showModalEdit}>
                    <div className={s.bigModal}>
                        <div className={s.titleModal}>
                            Edit card
                        </div>
                        Question
                        <Input value={editTitleQuestion} onChange={(e) => setEditTitleQuestion(e.currentTarget.value)}/>
                        Answer
                        <Input value={editTitleAnswer} onChange={(e) => setEditTitleAnswer(e.currentTarget.value)}/>                        <div className={s.containerBtn}>
                            <Button onClick={() => editShowModalEdit(false)}>cancel</Button>
                            <Button onClick={() => editCard(editTitleQuestion, editTitleAnswer)}>save</Button>
                        </div>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

