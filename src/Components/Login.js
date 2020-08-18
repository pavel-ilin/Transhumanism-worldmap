import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

  const submitLogin = () => {
    if (email !== '' && password !== '') {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(r => {
        dispatch(actions.loginAction(r.user.uid))
      })
      .catch(err => {
        console.log('Error: ', err);
      })
    }
    else {
      console.log('error')
    }
  }

  return (
    <div className='App'>
      <label><b>Email</b></label> 
      <input type="email" placeholder="Enter email"required value={email} onChange={e => setEmail(e.target.value)}></input>
      <label><b>Password</b></label> 
      <input type="password" placeholder="Enter Password" required value={password} onChange={e => setPassword(e.target.value)}></input>
      <button onClick={submitLogin}>Login</button> 
    </div>
  )
}

export default Login