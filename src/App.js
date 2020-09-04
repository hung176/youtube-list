import React, { Suspense } from 'react'
import Home from './component/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import EmptyPage from './component/empty/Empty'

const PlaylistDetail = React.lazy(() => import('./component/playlistdetail/PlaylistDetail'))
const PlayVideo = React.lazy(() => import('./component/playvideo/PlayVideo'))

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

          <Route path='/playvideo'>
            <PlayVideo />
          </Route>

          <Route path='/empty'>
            <EmptyPage />
          </Route>

        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
