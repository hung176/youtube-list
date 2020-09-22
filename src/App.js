import React, { Suspense } from 'react'
import Home from './pages/home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import EmptyPage from './component/EmptyComponent'
import Loading from './component/Loading'

const PlaylistDetail = React.lazy(() => import('./pages/playlist/PlaylistDetail'))
const PlayVideo = React.lazy(() => import('./component/playvideo/PlayVideo'))

function App () {
  return (
    <Suspense fallback={<div style={{ position: 'absolute', top: '50%', left: '50%' }}><Loading /></div>}>
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
