import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {AppRootStateType, useTypedDispatch} from '../../../../../state/store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';
import {useSelector} from "react-redux";
import s from "../../AllPacksList.module.css";
import Input from "../../../../../components/Input/Input";
import {Modal} from "../../../../../components/Modal/Modal";
import React, {useState} from "react";
import Radio from "../../../../../components/Radio/Radio";

const obj: H = {
    'Did not know': 1,
    'Forgot': 2,
    'A lot of thought': 3,
    'Confused': 4,
    'Knew the answer': 5
}
type A = 'Did not know' | 'Forgot' | 'A lot of thought' | 'Confused' |  'Knew the answer'
type H = {
    [key in A]: number
}


export const TableRow = ({cardPacks}: ResponseCardPackType) => {

    const {name, cardsCount, updated, user_name, _id, user_id} = cardPacks

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalLearn, setShowModalLearn] = useState(false);
    const [showModalLearn2, setShowModalLearn2] = useState(false);
    const [value, onChangeOption] = useState<string>("Knew the answer")
    const [packTitle, setTackTitle] = useState<string>(name)

    // @ts-ignore
    console.log(obj[value])

    const myUserId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (packTitle: string) => {
        dispatch(updatedPackTC(_id, packTitle))
    }

    const setChangePageToCard = () => {
        navigate(`${PATH.ALL_PACKS_LIST}/${_id}`)
    }

    const editShowModalDelete = (value: boolean) => {
        setShowModalDelete(value)
    }

    const editShowModalEdit = (value: boolean) => {
        setShowModalEdit(value)
    }

    const editShowModalLearn = (value: boolean) => {
        setShowModalLearn(value)
    }

    const editShowModalLearn2 = (value: boolean) => {
        setShowModalLearn2(value)
    }

    const editShowModalLearnNext = () => {
        setShowModalLearn2(false)
    }

    const allShowModalLearn = (value: boolean) => {
        setShowModalLearn(value)
        setShowModalLearn2(value)
    }

    return (
        <tr>
            <td onClick={setChangePageToCard}>
                {name}
            </td>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {myUserId === user_id && <Button onClick={() => editShowModalDelete(true)}>Delete</Button>}
                <Modal editShowModal={editShowModalDelete} showModal={showModalDelete}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Delete pack
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => setShowModalDelete(false)}>cancel</Button>
                            <Button onClick={() => deletePackHandler(_id)}>delete</Button>
                        </div>
                    </div>
                </Modal>

                {myUserId === user_id && <Button onClick={() => editShowModalEdit(true)}>Edit</Button>}
                <Modal editShowModal={editShowModalEdit} showModal={showModalEdit}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Edit pack
                        </div>
                        <Input value={packTitle} onChange={(e) => setTackTitle(e.currentTarget.value)}/>
                        <div className={s.containerBtn}>
                            <Button onClick={() => editShowModalEdit(false)}>cancel</Button>
                            <Button onClick={() => editPackHandler(packTitle)}>save</Button>
                        </div>
                    </div>
                </Modal>

                <Button onClick={() => editShowModalLearn(true)}>Learn</Button>
                <Modal editShowModal={editShowModalLearn} showModal={showModalLearn}>
                    <div className={s.modal}>
                        <div className={s.titleModal}>
                            Learn Pack Name
                        </div>
                        <div className={s.titleModal}>
                            Question:
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => setShowModalLearn(false)}>cancel</Button>
                            <Button onClick={() => editShowModalLearn2(true)}>show answer</Button>
                        </div>
                    </div>
                </Modal>

                <Modal editShowModal={allShowModalLearn} showModal={showModalLearn2}>
                    <div className={s.bigModal}>
                        <div className={s.titleModal}>
                            Learn Pack Name
                        </div>
                        <div className={s.titleModal}>
                            Question:
                        </div>
                        <div className={s.titleModal}>
                            Answer:
                        </div>
                        <div>
                            <Radio options={Object.keys(obj)}
                                   value={value}
                                   onChangeOption={onChangeOption}
                            />
                        </div>
                        <div className={s.containerBtn}>
                            <Button onClick={() => allShowModalLearn(false)}>cancel</Button>
                            <Button onClick={editShowModalLearnNext}>next</Button>
                        </div>
                    </div>
                </Modal>

            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}
