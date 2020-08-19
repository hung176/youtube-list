import { combineReducers } from 'redux'
import { playReducers } from './playlistReducer'
import { videoReducers } from './videoReducer'

const rootReducer = combineReducers({
  addPlaylist: playReducers,
  addVideos: videoReducers
})

export default rootReducer
