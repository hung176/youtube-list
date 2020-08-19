import React from 'react'
import '../App.css'
import '../style/VideoItem.css'
import { PlusCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'

const VideoListDefault = (props) =>
  <div className='list-video-default'>
    {props.listVideo.map(item => (
      <div className='videoItem' key={item.id.videoId}>
        <img
          src={item.snippet.thumbnails.medium.url}
          alt={item.snippet.title}
          className='imageItem'
          onClick={() => props.handleSelected(item.snippet.title)}
        />
        <div className='title'>{item.snippet.title}</div>
        <PlusCircleOutlined className='btn btn-add' />
        <PlayCircleOutlined className='btn btn-play' />
      </div>
      // <div key={item.id}>{item.title}</div>
    ))}
  </div>
export default VideoListDefault
