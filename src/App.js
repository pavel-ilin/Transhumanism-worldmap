import React, { Fragment, useState } from 'react';
import { decode, encode } from 'base-64'
import { Route, Switch, Redirect } from 'react-router-dom'

import WorldMap from './Components/WorldMap'
import Login from './Components/Login'
import Admin from './Components/Admin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = () => {
  const [token, setToken] = useState(false)

  return (
    <Fragment>
      <Switch>
        <Route exact path='/'><Redirect to='/map' /></Route>
        <Route path="/map"><WorldMap /></Route>
        <Route path="/login"><Login /></Route>
        {token && <Route path="/admin"><Admin /></Route>}
      </Switch>
    </Fragment>
  )
}

export default App;
