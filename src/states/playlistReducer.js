// actions
const ADD_PLAYLIST_NAME = 'ADD_PLAYLIST_NAME'
const ADD_VIDEO_TO_PLAYLIST = 'ADD_VIDEO_TO_PLAYLIST'
// const REMOVE_PLAYLIST_NAME = 'REMOVE_PLAYLIST_NAME'
// const REMOVE_VIDEO_FROM_PLAYLIST = 'REMOVE_VIDEO_FROM_PLAYLIST'

// initialState
const initialState = [
  {
    id: 1,
    title: 'Mikami',
    videos: []
  },
  {
    id: 2,
    title: 'Chelsea',
    videos: []
  }
]

// reducer
export const playlistReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYLIST_NAME:
      return [...state, action.payload]

    case ADD_VIDEO_TO_PLAYLIST:
      return (
        state.map(playlist => (
          playlist.id === action.payload.id
            ? { ...playlist, videos: [...playlist.videos, action.payload.video] }
            : playlist
        ))
      )

    default:
      return state
  }
}

// actionCreator
export const addPlaylistName = (playlistName) => {
  return {
    type: ADD_PLAYLIST_NAME,
    payload: playlistName
  }
}

export const addVideoToPlaylist = (video) => {
  return {
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: video
  }
}
