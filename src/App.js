import React, { Fragment } from 'react';
import { decode, encode } from 'base-64'
import WorldMap from './Components/WorldMap'


if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const App = () => {

          return (
            <Fragment>
                <WorldMap />
            </Fragment>
      )
    }

export default App;
