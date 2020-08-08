import React from 'react'
import '../App.css'

const VideoListDefault = (props) =>
  <div className='list-video-default'>
    {props.listVideo.map(item => (
      <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
        <div className='videoItem'>
          <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className='image' />
          <div className='title'>{item.snippet.title}</div>
        </div>
      </a>
      // <div key={item.id}>{item.title}</div>
    ))}
  </div>
export default VideoListDefault
