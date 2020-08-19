import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Admin = (props) => {
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.clear()
    firebase.auth().signOut();
    dispatch(actions.logoutAction())
  }

  const allCountries = () => {
    return props.allCountries.map(item => {
      return <option value={item}>{item}</option>
    })
  }

  const allStates = () => {
    return props.allStates.map(item => {
      return <option value={item}>{item}</option>
    })
  }

  return (
    <div className='App'>
      <div>Admin</div>
      <div>
        <div>
          <label>Add ambassador</label>
          <input type="text" placeholder="Enter name"></input>
          <select name="countries" id="country-select">
            <option value="">--Select country--</option>
            {allCountries()}
          </select>
          <button>Submit</button>
        </div>
        <div>
         <label>Add US state party</label> 
         <input type="text" placeholder="title"></input>
         <input type="text" placeholder="url"></input>
         <select name="states" id="state-select">
            <option value="">--Select US state--</option>
            {allStates()}
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
      user: state.user,
      allCountries: state.storage.allCountries,
      allStates: state.storage.allStates
    };
  };

export default connect(mapStateToProps)(Admin)