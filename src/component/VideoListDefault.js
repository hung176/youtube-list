import React from 'react'
import '../App.css'
import '../style/VideoItem.css'
import { PlusCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { addVideos } from '../states/videoReducer'

const VideoListDefault = ({ listVideo }) => {
  const addVideo = useSelector(state => {
    return state.addVideos
  })

  const dispatch = useDispatch()

  return (
    <div className='list-video-default'>
      {listVideo.map(item => (
        <div className='videoItem' key={item.id.videoId}>
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className='imageItem'
          />
          <div className='title'>{item.snippet.title}</div>
          <PlusCircleOutlined
            className='btn btn-add'
            onClick={() => dispatch(addVideos(item.snippet.title))}
          />
          <PlayCircleOutlined className='btn btn-play' />
        </div>
      // <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
export default VideoListDefault
