import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import { fetchVideos, getQueries } from '../states'

import SearchBar from './SearchBar'
import VideoListDefault from './VideoListDefault'
// import Playlist from './Playlist'

export default function Home () {
  const dispatch = useDispatch()
  const queries = useSelector(getQueries)

  useEffect(() => {
    compose(dispatch, fetchVideos)(queries)
  }, [queries])

  return (
    <div className='App'>

      <div className='searchbar-listvideo'>
        <SearchBar />
        <VideoListDefault />
      </div>

      {/* <div>
        <Playlist />
      </div> */}
    </div>
  )
}
