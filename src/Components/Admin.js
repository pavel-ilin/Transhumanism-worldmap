import React, {useState} from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom'
import '../App.css';
import actions from '../redux/actions/actions'
import firebase from '../utils/firebaseConfig';

const Admin = (props) => {
  let [ambassador, setAmbassador] = useState('')
  let [country, setCountry] = useState('')

  let [patryTitle, setPartyTitle] = useState('')
  let [url, setUrl] = useState('')
  let [state, setState] = useState('')

  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.clear()
    firebase.auth().signOut();
    dispatch(actions.logoutAction())
  }

  const submitCountry = () => {
    if (country === '' || ambassador === ''){
      return false
    }
    else {
      dispatch(actions.addAmbassador(country, ambassador))
    }
  }

  const submitUsState = () => {
    if (patryTitle === '' || url === '' || state === ''){
      return false
    }
    else {
      dispatch(actions.addState(state, patryTitle, url))
    }
  }

  const allCountries = () => {
    let key = 0
    let england = false
    return props.allCountries.map(item => {
      if (!england && item === 'England'){
        england = true
        key++
        return <option key={key} value={item}>{item}</option>
      }
      else if (item !== 'England') {
        key++
        return <option key={key} value={item}>{item}</option>
      }
    })
  }

  const allStates = () => {
    let key = 0
    return props.allStates.map(item => {
      key++
      return <option key={key} value={item}>{item}</option>
    })
  }

  return (
    <div className='App'>
      <div>Admin</div>
      <div>
        <div>
          <label>Add ambassador</label>
          <input type="text" placeholder="Enter name" value={ambassador} onChange={e => setAmbassador(e.target.value)}></input>
          <select name="countries" id="country-select" onChange={e => setCountry(e.target.value)}>
            <option value="">--Select country--</option>
            {allCountries()}
          </select>
          <button onClick={submitCountry}>Submit</button>
        </div>
        <div>
         <label>Add US state party</label> 
         <input type="text" placeholder="title" value={patryTitle} onChange={e => setPartyTitle(e.target.value)}></input>
         <input type="text" placeholder="url" value={url} onChange={e => setUrl(e.target.value)}></input>
         <select name="states" id="state-select" onChange={e => setState(e.target.value)}>
            <option value="">--Select US state--</option>
            {allStates()}
          </select>
          <button onClick={submitUsState}>Submit</button>
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