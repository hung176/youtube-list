
const FILTER_PLAYLIST = 'FILTER_PLAYLIST'
const GET_DATA = 'GET_DATA'
const REMOVE_VIDEO = 'REMOVE_VIDEO'

// reducer
export const filterPlaylistReducer = (state = [], action) => {
  switch (action.type) {
    case FILTER_PLAYLIST:
      return state.filter(playlist => playlist.title === action.payload)

    case GET_DATA:
      return action.payload

    case REMOVE_VIDEO:
      return (
        state.map(playlist => (
          { ...playlist, videos: playlist.videos.filter(video => video.id !== action.payload) }
        ))
      )

    default:
      return state
  }
}

// action creators
export const getData = (playlist) => {
  return {
    type: GET_DATA,
    payload: playlist
  }
}

export const filterPlaylist = (titlePlaylist) => {
  return {
    type: FILTER_PLAYLIST,
    payload: titlePlaylist
  }
}

export const removeVideoStateFiltered = (video) => {
  return {
    type: REMOVE_VIDEO,
    payload: video
  }
}
