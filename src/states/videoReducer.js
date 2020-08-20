// action
const CLICK_VIDEO = 'CLICK_VIDEO'

// initialState
const initialState = {
  title: '',
  id: ''
}

// reducer

export const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_VIDEO:
      return {
        title: action.payload.snippet.title,
        id: action.payload.id.videoId
      }

    default:
      return state
  }
}

// actionCreator
export const clickVideo = (video) => {
  return {
    type: CLICK_VIDEO,
    payload: video
  }
}
