import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { randomId } from '@mieuteacher/meomeojs';
import api from '@services/apis'
import { InputGroup, Form } from 'react-bootstrap';
import { userAction } from '../../store/slices/user.slice';
import { Modal } from 'antd';


export default function Updateform({ id, dispatch }) {
    const [nameError, setNameError] = useState(null);
    const [desError, setDesError] = useState(null);
    async function handleUpdateUser(e) {
        e.preventDefault();
        const nameValue = e.target.name.value;
        const desValue = e.target.des.value;

        if (!nameValue.trim()) {
            alert("vui lòng nhập name");
            return;
        }

        // Kiểm tra trường description
        if (!desValue.trim()) {
            alert("vui lòng nhập description");
            return;
        }

        try {

            let updateNewUsers = {
                name: nameValue,
                des: desValue
            }
            // let newUSer = JSON.stringify(newUser);
            console.log("updateNewUsers", updateNewUsers);


            let result = await api.user.update(id, updateNewUsers)
            console.log("reuslt", result);
            Modal.success({
                title: "notication",
                content: "bạn muốn thay đổi không ?",
                onOk: () => {
                    dispatch(userAction.updateUser({ id: id, data: updateNewUsers }))
                    dispatch(userAction.loadModal2())
                }
            })

        } catch (err) {
            console.log("không update được", err);

        }
    }
    return (
        <div className='create_form'>
            <form onSubmit={(e) => {
                handleUpdateUser(e)

            }}>
                <div className='create_box'>
                    <div className='btn_box'>
                        <span>Update a new student</span>
                        <button onClick={() => {
                            dispatch(userAction.loadModal2())
                        }} type='button' className='btn btn-danger'>X</button>
                    </div>
                    <label htmlFor="name">Name</label>
                    <br></br>
                    <input type="text" placeholder='nhập user' id='name' name='name' />
                    <br />
                    <label htmlFor="des">description</label>
                    <br></br>
                    <input className='destext' type="text" placeholder='text...' id='des' name='des' />
                    <button
                        type="submit" className='btn btn-success'>
                        Save
                    </button>
                </div>

            </form>

        </div>
    )
}
