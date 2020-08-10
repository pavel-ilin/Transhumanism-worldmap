import React, { Fragment } from 'react';
import { decode, encode } from 'base-64'
import { Route, Switch } from 'react-router-dom'

import WorldMap from './Components/WorldMap'
import Login from './Components/Login'
import Admin from './Components/Admin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = () => {

          return (
            <Fragment>
              <Switch>
                <Route path="/"><WorldMap /></Route>
              </Switch>
            </Fragment>
      )
    }

export default App;
