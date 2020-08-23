import { combineReducers } from 'redux'
import { playlistReducers } from './playlistReducer'
import { videoReducers } from './videoReducer'
import { filterPlaylistReducer } from './filterplaylist'

export const combineReducer = combineReducers({
  playlist: playlistReducers,
  video: videoReducers,
  filterPlaylist: filterPlaylistReducer
})
