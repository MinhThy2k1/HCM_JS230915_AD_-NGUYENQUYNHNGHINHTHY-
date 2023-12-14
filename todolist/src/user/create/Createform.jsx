import React, { useState } from 'react'

import { randomId } from '@mieuteacher/meomeojs';
import api from '@services/apis'
import { InputGroup, Form, Spinner } from 'react-bootstrap';
import { userAction } from '../../store/slices/user.slice';
import { Modal } from 'antd';


export default function Createform({ dispatch }) {
  const [nameError, setNameError] = useState(null);
  const [desError, setDesError] = useState(null);
  async function handleAddUser(e) {
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

      let newUsers = {
        name: nameValue,
        des: desValue,
      }
      // let newUSer = JSON.stringify(newUser);
      console.log("newuser", newUsers);


      let result = await api.user.create(newUsers)
      console.log("reuslt", result);
      Modal.success({
        title: "notication",
        content: result.data.message,
        onOk: () => {
          dispatch(userAction.addData(result.data.data))

          dispatch(userAction.loadModal())
        }
      })

    } catch (err) {
      console.log("lỗi gì đó", err);

    }
  }
  return (
    <div className='create_form'>
      <form onSubmit={(e) => {
        handleAddUser(e)

      }}>
        <div className='create_box'>
          <div className='btn_box'>
            <span>Create a new student !</span>
            <button onClick={() => {
              dispatch(userAction.loadModal())
            }} type='button' className='btn btn-danger'>X</button>
          </div>
          <label htmlFor="name">Name</label>
          <br></br>
          <input type="text" placeholder='nhập user' id='name' name='name' />
          <br />
          <label htmlFor="des">description</label>
          <br></br>
          <input className='destext' type="text" placeholder='text...' id='des' name='des' />
          <br></br>
          <button type="submit" className='btn btn-success'>
            Add
          </button>
        </div>

      </form>

    </div>
  )
}
