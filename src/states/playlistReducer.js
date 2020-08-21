// actions
const ADD_PLAYLIST_NAME = 'ADD_PLAYLIST_NAME'
const ADD_VIDEO_TO_PLAYLIST = 'ADD_VIDEO_TO_PLAYLIST'
// const REMOVE_PLAYLIST_NAME = 'REMOVE_PLAYLIST_NAME'
// const REMOVE_VIDEO_FROM_PLAYLIST = 'REMOVE_VIDEO_FROM_PLAYLIST'
const CHECKBOX_PLAYLIST = 'CHECKBOX_PLAYLIST'

// initialState
const initialState = [
  {
    id: 1,
    title: 'Mikami',
    checked: false,
    videos: []
  },
  {
    id: 2,
    title: 'Chelsea',
    checked: false,
    videos: []
  }
]

// reducer
export const playlistReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYLIST_NAME:
      return [...state, action.payload]

    case CHECKBOX_PLAYLIST:
      return (state.map(playlist => (
        playlist.title === action.payload.title ? { ...playlist, checked: action.payload.status } : playlist
      )))

    case ADD_VIDEO_TO_PLAYLIST:
      return (
        state.map(playlist => (
          (playlist.checked && !playlist.videos.some(val => val.id === action.payload.id))
            ? { ...playlist, checked: false, videos: [...playlist.videos, action.payload] }
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

export const checkboxPlaylist = (action) => {
  return {
    type: CHECKBOX_PLAYLIST,
    payload: action
  }
}
