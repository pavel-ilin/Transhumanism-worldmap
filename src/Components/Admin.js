import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import firebase from '../utils/firebaseConfig';

const Admin = (props) => {

  const signOut = () => {
    firebase.auth().signOut();
  }

  return (
    <div className='App'>
      <div>Admin</div>
      <div>Form</div>
      <div><button onClick={signOut}>SignOut</button></div>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(Admin)