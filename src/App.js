import React, { Fragment } from 'react';
import { decode, encode } from 'base-64'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux';
import './App.css';
import actions from './redux/actions/actions'

import WorldMap from './components/WorldMap'
import Login from './components/Login'
import Admin from './components/Admin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = (props) => {
  const dispatch = useDispatch()
  if(!props.geodata){
    dispatch(actions.getGeoData())
  }

  return (
    <Fragment>
      <Switch>
        <Route exact path='/'><Redirect to='/map' /></Route>
        <Route path="/map"><WorldMap /></Route>
        <Route path="/admin">{props.user ? <Admin /> : <Redirect to='/login' />}</Route>
        <Route path="/login">{props.user ? <Redirect to='/admin' /> : <Login />}</Route>
        <Route render={() => <Redirect to="/admin" />} />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    geodata: state.storage.geoData
  };
};

export default connect(mapStateToProps)(App);
