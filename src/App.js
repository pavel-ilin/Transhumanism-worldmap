import React, { Fragment, useEffect, useState } from 'react';
import { decode, encode } from 'base-64'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux';
import firebase from './utils/firebaseConfig';
import './App.css';

import actions from './redux/actions/actions'

import WorldMap from './components/WorldMap'
import Login from './components/Login'
import Admin from './components/Admin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = (props) => {
  const [userData, setUserData] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        dispatch(actions.loadData(user))
        setUserData(user)
      }
    });
  })

  return (
    <Fragment>
      <Switch>
        <Route exact path='/'><Redirect to='/map' /></Route>
        <Route path="/map"><WorldMap /></Route>
        {userData && <Route path="/admin">{userData ? <Admin /> : <div className='App' >loading</div>}</Route>}
        <Route path="/login">{props.user ? <Redirect to='/admin' /> : <Login />}</Route>
        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps)(App);
