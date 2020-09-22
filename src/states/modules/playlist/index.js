
// namespace
export const namespace = 'playlist'

// actions
const ADD_VIDEO_TO_PLAYLISTS = 'ADD_VIDEO_TO_PLAYLIST'
const ADD_PLAYLIST_NAME = 'ADD_PLAYLIST_NAME'
const EDIT_PLAYLIST_NAME = 'EDIT_PLAYLIST_NAME'
const ADD_DESCRIPTION_PLAYLIST = 'ADD_DESCRIPTION_PLAYLIST'
const DELETE_PLAYLIST = 'DELETE_PLAYLIST'
const DELETE_VIDEO_FROM_PLAYLIST = 'DELETE_VIDEO_FROM_PLAYLIST'

const initialState = {
  1: {
    id: 1,
    playlistTitle: 'mikami',
    description: '',
    videos: []
  },

  2: {
    id: 2,
    playlistTitle: 'chelsea',
    description: 'Chelsea Football Club are an English professional football club based in Fulham, London. Founded in 1905, the club competes in the Premier League, the top division of English football. Chelsea are among England most successful clubs, having won over thirty competitive honours, including six league titles and six European trophies. Their home ground is Stamford Bridge',
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
  const idVideo = video.idVideo
  const isExistVideo = state[id].videos.some(video => video.idVideo === idVideo)

  if (isExistVideo) return state
  else {
    return {
      ...state,
      [id]: {
        ...state[id],
        videos: [...state[id].videos, video]
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

// delete video
function deleteVideoReducer (state, action) {
  const { idPlaylist, idVideo } = action.payload
  const videosFiltered = state[idPlaylist].videos.filter(video => video.idVideo !== idVideo)
  return {
    ...state,
    [idPlaylist]: {
      ...state[idPlaylist],
      videos: videosFiltered
    }
  }
}

// delete Playlist
function deletePlaylistReducer (state, action) {
  const idPlaylist = action.payload
  const removePlaylist = { ...state }
  delete removePlaylist[idPlaylist]
  return removePlaylist
}

// reducer
export default function playlistReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYLIST_NAME:
      return addPlaylistName(state, action)

    case ADD_VIDEO_TO_PLAYLISTS:
      return addVideo(state, action)

    case EDIT_PLAYLIST_NAME:
      return playlistNameReducer(state, action)

    case ADD_DESCRIPTION_PLAYLIST:
      return addDescriptionReducer(state, action)

    case DELETE_VIDEO_FROM_PLAYLIST:
      return deleteVideoReducer(state, action)

    case DELETE_PLAYLIST:
      return deletePlaylistReducer(state, action)

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

export const addVideoToPlaylists = (id, video) => {
  return {
    type: ADD_VIDEO_TO_PLAYLISTS,
    payload: {
      id,
      video
    }
  }
}

export const deleteVideoFromPlaylist = (idPlaylist, idVideo) => {
  return {
    type: DELETE_VIDEO_FROM_PLAYLIST,
    payload: {
      idPlaylist,
      idVideo
    }
  }
}

export const deletePlaylist = (idPlaylist) => {
  return {
    type: DELETE_PLAYLIST,
    payload: idPlaylist
  }
}

// selector
export const getPlaylists = (state) => state[namespace]
