
// namespace
export const namespace = 'playlist'

// actions
const ADD_VIDEO_TO_PLAYLIST = 'ADD_VIDEO_TO_PLAYLIST'
const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX'
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
    isChecked: false,
    videos: []
  },

  2: {
    id: 2,
    playlistTitle: 'chelsea',
    description: 'Chelsea Football Club are an English professional football club based in Fulham, London. Founded in 1905, the club competes in the Premier League, the top division of English football. Chelsea are among England most successful clubs, having won over thirty competitive honours, including six league titles and six European trophies. Their home ground is Stamford Bridge',
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

// toggle checkbox
function toggleCheckboxReducer (state, action) {
  const { id, status } = action.payload
  return {
    ...state,
    [id]: {
      ...state[id],
      isChecked: status
    }
  }
}

// add video to playlist
function addVideo (state, action) {
  const idArr = Object.keys(state)
  const video = action.payload

  const valueArr = Object.values(state).map(obj => {
    const isExistVideo = obj.videos.map(val => val.idVideo)

    if (obj.isChecked && !isExistVideo.includes(video.idVideo)) {
      obj.videos = [...obj.videos, video]
    }
    obj.isChecked = false
    return obj
  })

  const newState = {}
  idArr.forEach((key, index) => {
    newState[key] = valueArr[index]
  })

  return newState
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

    case ADD_VIDEO_TO_PLAYLIST:
      return addVideo(state, action)

    case EDIT_PLAYLIST_NAME:
      return playlistNameReducer(state, action)

    case ADD_DESCRIPTION_PLAYLIST:
      return addDescriptionReducer(state, action)

    case DELETE_VIDEO_FROM_PLAYLIST:
      return deleteVideoReducer(state, action)

    case DELETE_PLAYLIST:
      return deletePlaylistReducer(state, action)

    case TOGGLE_CHECKBOX:
      return toggleCheckboxReducer(state, action)

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

export function toggleCheckbox (id, status) {
  return {
    type: TOGGLE_CHECKBOX,
    payload: {
      id,
      status
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

export const addVideoToPlaylist = (video) => {
  return {
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: video
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
