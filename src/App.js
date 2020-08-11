import React, { Fragment, useEffect, useState } from 'react';
import { decode, encode } from 'base-64'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import firebase from './utils/firebaseConfig';

import WorldMap from './components/WorldMap'
import Login from './components/Login'
import Admin from './components/Admin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = (props) => {
  const [userData, setUserData] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      setUserData(user)
    });
  })

  return (
    <Fragment>
      <Switch>
        <Route exact path='/'><Redirect to='/map' /></Route>
        <Route path="/map"><WorldMap /></Route>
        <Route path="/admin">{userData ? <Admin /> : <Login />}</Route>
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
