import React, { Suspense } from 'react'
import Home from './component/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const PlaylistDetail = React.lazy(() => import('./component/playlistdetail/PlaylistDetail'))

function App () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}

export default App
