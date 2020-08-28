
// namespace
export const namespace = 'search/queries'
// action
export const SEARCH_VIDEO = 'SEARCH_VIDEO'

// reducer
export default function searchReducer (state = 'abc', action) {
  switch (action.type) {
    case SEARCH_VIDEO:
      return action.payload
    default:
      return state
  }
}

// actioncreator
export const SearchVideo = (queries) => {
  return {
    type: SEARCH_VIDEO,
    payload: queries
  }
}

// selector
export const getQueries = (state) => state[namespace]
