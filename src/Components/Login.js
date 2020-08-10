import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../App.css';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='App'>
      <label><b>Email</b></label> 
      <input type="email" placeholder="Enter email"required value={email} onChange={e => setEmail(e.target.value)}></input>
      <label><b>Password</b></label> 
      <input type="password" placeholder="Enter Password" required value={password} onChange={e => setPassword(e.target.value)}></input>
      <button type="submit">Login</button> 
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login)