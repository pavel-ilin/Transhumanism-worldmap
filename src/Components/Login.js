import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../App.css';
// import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const dispatch = useDispatch();

  const submitLogin = async () => {
    if (email !== '' && password !== '') {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log('Error: ', err);
      })
      // let currentUser = await firebase.auth().currentUser
      // dispatch(actions.loginAction(currentUser))
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login)