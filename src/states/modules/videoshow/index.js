import fetchingData from '../../../api/fetchingData'

// namespace
export const namespace = 'showvideo'

// actions
export const FETCH_VIDEO_FETCHING = 'FETCH_VIDEO_FETCHING'
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS'
export const FETCH_VIDEO_ERROR = 'FETCH_VIDEO_ERROR'
export const SELECT_VIDEO = 'SELECT_VIDEO'

// reducer
export default function videosReducer (state = {
  isFetching: false,
  videos: [],
  selectVideo: {},
  error: null
}, action) {
  switch (action.type) {
    case FETCH_VIDEO_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      })

    case FETCH_VIDEO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        videos: action.payload,
        error: null
      })

    case FETCH_VIDEO_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      })

    case SELECT_VIDEO:
      return Object.assign({}, state, {
        selectVideo: action.payload
      })

    default:
      return state
  }
}

// action creator
export const fetchVideos = (queries) => dispatch => {
  dispatch({
    type: FETCH_VIDEO_FETCHING
  })

  fetchingData(queries)
    .then(res => res.json())
    .then(videos => dispatch({
      type: FETCH_VIDEO_SUCCESS,
      payload: videos.items
    }))
    .catch(error => dispatch({
      type: FETCH_VIDEO_ERROR,
      payload: error.message
    }))
}

export const selectVideo = (video) => {
  return {
    type: SELECT_VIDEO,
    payload: video
  }
}
// selector
export const getVideos = (state) => state[namespace]
