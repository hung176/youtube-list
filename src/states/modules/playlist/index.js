let playlistId = 0

// namespace
export const namespace = 'playlist'

// actions
const GET_VIDEO = 'GET_VIDEO'
const ADD_VIDEO_TO_PLAYLIST = 'ADD_VIDEO_TO_PLAYLIST'
const CHECKED_PLAYLIST = 'CHECKED_PLAYLIST'
const UNCHECKED_PLAYLIST = 'UNCHECKED_PLAYLIST'
const ADD_PLAYLIST_NAME = 'ADD_PLAYLIST_NAME'

// initialState
const initialState = {
  playlist: [
    {
      id: playlistId++,
      playlistTitle: 'mikami',
      isChecked: false,
      videos: []
    },
    {
      id: playlistId++,
      playlistTitle: 'chelsea',
      isChecked: false,
      videos: []
    }
  ],
  videoSelected: {}
}

// reducer
export default function playlistReducer (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO:
      return {
        ...state,
        videoSelected: action.payload
      }

    case ADD_PLAYLIST_NAME:
      return {
        ...state,
        playlist: [...state.playlist, { id: playlistId++, playlistTitle: action.payload, isChecked: false, videos: [] }]
      }

    case CHECKED_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.map(pl => (
          pl.playlistTitle === action.payload.title ? { ...pl, isChecked: action.payload.status } : pl
        ))
      }

    case UNCHECKED_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.map(pl => (
          { ...pl, isChecked: action.payload }
        ))
      }

    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.map(pl => (
          pl.isChecked && !pl.videos.some(val => val.idVideo === state.videoSelected.idVideo)
            ? { ...pl, isChecked: false, videos: [...pl.videos, state.videoSelected] }
            : { ...pl, isChecked: false }
        ))
      }

    default:
      return state
  }
}

// actionCreator
export const createPlaylistName = (name) => {
  return {
    type: ADD_PLAYLIST_NAME,
    payload: name
  }
}

export const addVideoToPlaylist = () => {
  return {
    type: ADD_VIDEO_TO_PLAYLIST
  }
}

export const checkedPlaylist = (action) => {
  return {
    type: CHECKED_PLAYLIST,
    payload: action
  }
}

export const unCheckedPlaylist = (unchecked) => {
  return {
    type: UNCHECKED_PLAYLIST,
    payload: unchecked
  }
}

export const getInforVideo = (video) => {
  return {
    type: GET_VIDEO,
    payload: video
  }
}

// selector
export const getPlaylists = (state) => state[namespace]
