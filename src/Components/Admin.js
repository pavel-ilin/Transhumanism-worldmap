import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import '../App.css';
import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Admin = (props) => {
  const dispatch = useDispatch();

  const signOut = () => {
    firebase.auth().signOut();
    dispatch(actions.logoutAction())
  }

  useEffect(() => {
    firebase.firestore().collection('map').get()
    .then(r => {
      r.docs.map(doc => {
        console.log('LOG 1', doc.data());
      });
    })
  })

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