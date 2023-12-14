import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { randomId } from '@mieuteacher/meomeojs';
import { useSelector, useDispatch } from 'react-redux';
import Createform from './create/Createform';
import Updateform from './create/Updateform';
import { userAction } from '../store/slices/user.slice'
import { Modal } from 'antd';
import api from '@services/apis'
import './user.scss'


export default function User() {
  const dispatch = useDispatch()
  const userStore = useSelector(store => store.userStore);
  const [id, setid] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');


  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedData = userStore.data.slice().sort((a, b) => {
      return newOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });
    dispatch(userAction.setData(sortedData));
  };

  const handleDeleteDo = (user) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Are you sure want to delete student?',
      async onOk() {
        try {
          await api.user.delete(user.id);
          dispatch(userAction.delete(user.id));
          alert("đã xóa sinh viên này")
        } catch (err) {
          console.log("Lỗi khi xóa sinh viên", err);
        }
      },
      onCancel() {

      },
    });
  };
  return (
    <>
      <div className='ModalForm'>
        {
          userStore.addModal && <Createform dispatch={dispatch} />
        }
        {
          userStore.addModal2 && userStore.addModal == false && <Updateform id={id} dispatch={dispatch} />
        }
      </div>

      <div>
        <div className='Button-create'>
          <button type="button" class="btn btn-success" onClick={() => {
            dispatch(userAction.loadModal())
          }}>Create Student</button>
        </div>

      </div>
      <div className='TableForm'>
        <caption className='caption'>Student List</caption>
        <Table striped bordered hover>

          <thead>
            <tr>
              <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                Id {sortOrder == 'asc' ? '▲' : '▼'}
              </th>
              <th> Name</th>
              <th>Desription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              userStore.data?.map((user, index) => {


                return (
                  <>

                    <tr key={randomId()}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.des}</td>
                      <td className='Table_Tool'>

                        <button onClick={() => {
                          dispatch(userAction.loadModal2())
                          setid(user.id)
                        }} className='btn btn-primary'>update</button>
                        <button onClick={() => handleDeleteDo(user)}
                          className='btn btn-danger'>delete</button>
                      </td>

                    </tr>

                  </>

                )
              })

            }
          </tbody>
        </Table>
      </div>



    </>
  )
}
