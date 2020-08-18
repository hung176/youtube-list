import React from 'react'
import '../App.css'

const VideoListDefault = (props) =>
  <div className='list-video-default'>
    {props.listVideo.map(item => (
      // <div className='videoItem' key={item.id.videoId}>
      //   <img
      //     src={item.snippet.thumbnails.medium.url}
      //     alt={item.snippet.title}
      //     className='image'
      //     onClick={() => props.handleSelected(item.snippet.title)}
      //   />
      //   <div className='title'>{item.snippet.title}</div>
      // </div>
      <div key={item.id}>{item.title}</div>
    ))}
  </div>
export default VideoListDefault
