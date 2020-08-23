import React from 'react'
import Home from './component/Home'
import AllPlayList from './component/AllPlayList'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/allplaylist'>
          <AllPlayList />
        </Route>

      </Switch>
    </Router>
  )
}

export default App
