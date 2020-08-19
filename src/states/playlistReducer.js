// actions
const ADD_PLAYLIST = 'ADD_PLAYLIST'
// const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'

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
export const playReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYLIST:
      return [...state, action.payload]

    default:
      return state
  }
}

// actionCreator
export const addPlaylist = (playlist) => {
  return {
    type: ADD_PLAYLIST,
    payload: playlist
  }
}
