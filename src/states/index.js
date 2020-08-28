import { combineReducers } from 'redux'
import { playlistReducers } from './playlistReducer'
import { videoReducers } from './videoReducer'
import { filterPlaylistReducer } from './filterplaylist'

import videosReducer, { namespace as showVideoNamespace } from './modules/videoshow/index'
import searchReducer, { namespace as queriesNameSpace } from './modules/searchvideos/index'

export const combineReducer = combineReducers({
  playlist: playlistReducers,
  video: videoReducers,
  filterPlaylist: filterPlaylistReducer,
  [showVideoNamespace]: videosReducer,
  [queriesNameSpace]: searchReducer
})

export { fetchVideos, getVideos } from './modules/videoshow/index'
export { SearchVideo, getQueries } from './modules/searchvideos/index'
