import React from 'react'
import User from './user/User'
import './main.scss'
import api from '../src/services/apis'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from '../src/store/slices/user.slice'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      api.user.findMany()
        .then(res => {
          dispatch(userAction.setData(res.data))
          console.log(userAction.setData(res.data));
        })
        .catch(err => {
          console.log("err trong", err);

        })
    } catch (err) {
      console.log(err);
    }
  }, [])



  return (
    <div>
      <User />
    </div>

  )
}
