
// namespace
export const namespace = 'playlist'

// actions
const ADD_VIDEO_TO_PLAYLIST = 'ADD_VIDEO_TO_PLAYLIST'
const ADD_PLAYLIST_NAME = 'ADD_PLAYLIST_NAME'
const EDIT_PLAYLIST_NAME = 'EDIT_PLAYLIST_NAME'
const ADD_DESCRIPTION_PLAYLIST = 'ADD_DESCRIPTION_PLAYLIST'

const initialState = {
  1: {
    id: 1,
    playlistTitle: 'mikami',
    description: '',
    isChecked: false,
    videos: []
  },

  2: {
    id: 2,
    playlistTitle: 'chelsea',
    description: '',
    isChecked: false,
    videos: []
  }
}

// addPlaylistName
function addPlaylistName (state, action) {
  const { id } = action.payload
  return {
    ...state,
    [id]: action.payload
  }
}

// add video to playlist
function addVideo (state, action) {
  const { id, video } = action.payload
  if (!id) {
    return state
  } else {
    const { idVideo } = video
    const prevIdVideo = state[id].videos.map(video => video.idVideo)
    if (prevIdVideo.includes(idVideo)) {
      return state
    } else {
      return {
        ...state,
        [id]: {
          ...state[id],
          isChecked: false,
          videos: [...state[id].videos, video]
        }
      }
    }
  }
}

// edit playlist name
function playlistNameReducer (state, action) {
  const { id, newName } = action.payload
  return {
    ...state,
    [id]: {
      ...state[id],
      playlistTitle: newName
    }
  }
}

// add description
function addDescriptionReducer (state, action) {
  const { id, text } = action.payload
  return {
    ...state,
    [id]: {
      ...state[id],
      description: text
    }
  }
}

// reducer
export default function playlistReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYLIST_NAME:
      return addPlaylistName(state, action)

    case ADD_VIDEO_TO_PLAYLIST:
      return addVideo(state, action)

    case EDIT_PLAYLIST_NAME:
      return playlistNameReducer(state, action)

    case ADD_DESCRIPTION_PLAYLIST:
      return addDescriptionReducer(state, action)

    default:
      return state
  }
}

// actionCreator
export function createPlaylistName (id, playlistTitle) {
  return {
    type: ADD_PLAYLIST_NAME,
    payload: {
      id,
      playlistTitle,
      isChecked: false,
      videos: []
    }
  }
}

export function editPlaylistName (id, newName) {
  return {
    type: EDIT_PLAYLIST_NAME,
    payload: {
      id,
      newName
    }
  }
}

export function addDescription (id, text) {
  return {
    type: ADD_DESCRIPTION_PLAYLIST,
    payload: {
      id,
      text
    }
  }
}

export const addVideoToPlaylist = (id, video) => {
  return {
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: {
      id,
      video
    }
  }
}

// selector
export const getPlaylists = (state) => state[namespace]
