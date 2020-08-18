import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Admin = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.clear()
    firebase.auth().signOut();
    dispatch(actions.logoutAction())
  }

  return (
    <div className='App'>
      <div>Admin</div>
      <div>
        <div>
          <label>Add ambassador</label>
          <input type="text" placeholder="Enter name"></input>
          <select name="countries" id="country-select">
            <option value="">--Please choose an option--</option>
          </select>
          <button>Submit</button>
        </div>
        <div>
         <label>Add US state</label> 
         <input type="text" placeholder="Enter name"></input>
         <select name="states" id="state-select">
            <option value="">--Please choose an option--</option>
          </select>
          <button>Submit</button>
        </div>
      </div>
      <div><Link to='/login'><button onClick={signOut}>SignOut</button></Link></div>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

export default connect(mapStateToProps)(Admin)