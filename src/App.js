import React from 'react'
import Home from './component/home/Home'
import PlaylistDetail from './component/playlistdetail/PlaylistDetail'
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

        <Route path='/playlist'>
          <PlaylistDetail />
        </Route>

      </Switch>
    </Router>
  )
}

export default App
