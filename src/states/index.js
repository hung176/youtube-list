import { combineReducers } from 'redux'

import videosReducer, { namespace as showVideoNamespace } from './modules/videoshow/index'
import searchReducer, { namespace as queriesNameSpace } from './modules/searchvideos/index'
import playlistReducer, { namespace as playlistNameSpace } from './modules/playlist/index'

export const combineReducer = combineReducers({

  [playlistNameSpace]: playlistReducer,
  [showVideoNamespace]: videosReducer,
  [queriesNameSpace]: searchReducer
})

export { fetchVideos, getVideos, selectVideoItem } from './modules/videoshow/index'
export { SearchVideo, getQueries } from './modules/searchvideos/index'
export
{
  createPlaylistName,
  addVideoToPlaylists,
  getPlaylists,
  editPlaylistName,
  addDescription,
  deleteVideoFromPlaylist,
  deletePlaylist
} from './modules/playlist/index'
