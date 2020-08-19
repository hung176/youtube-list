// actions
const ADD_VIDEO = 'ADD_VIDEO'
// const REMOVE_VIDEO = 'REMOVE_VIDEO'

// initialState
const initialState = []
// reducer
export const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return [...state, action.payload]

    default:
      return state
  }
}

// actionCreator
export const addVideos = (video) => {
  return {
    type: ADD_VIDEO,
    payload: video
  }
}
