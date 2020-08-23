
const FILTER_PLAYLIST = 'FILTER_PLAYLIST'
const GET_DATA = 'GET_DATA'

// reducer
export const filterPlaylistReducer = (state = [], action) => {
  switch (action.type) {
    case FILTER_PLAYLIST:
      return state.filter(playlist => playlist.title === action.payload)

    case GET_DATA:
      return action.payload

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
