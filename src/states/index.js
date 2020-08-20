import { combineReducers } from 'redux'
import { playlistReducers } from './playlistReducer'
import { videoReducers } from './videoReducer'

export const combineReducer = combineReducers({
  playlist: playlistReducers,
  video: videoReducers
})
