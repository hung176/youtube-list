import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Empty } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import '../style/allplaylist.css'

const { Meta } = Card

function AllPlayList () {
  const data = useSelector(state => state.filterPlaylist)
  const [videoTitle, setVideoTitle] = useState('')
  const [videoId, setVideoId] = useState('')
  let videos
  const handleClick = (e, title, id) => {
    setVideoTitle(title)
    setVideoId(id)
  }

  if (data.length !== 0) {
    videos = data[0].videos
    const url = `https://www.youtube.com/embed/${videoId}`
    return (
      <div>
        <div className='header-playlist'>PLAYLIST</div>
        <div className='iframe-player'>
          <iframe title={videoTitle} src={url} allowFullScreen />
          <div>{videoTitle}</div>
        </div>
        <div className='playlist-container'>
          <div className='title-playlist'>{data[0].title}</div>
          <div className='card-video-container'>
            {videos.map(video => (
              <Card
                hoverable
                key={video.id}
                style={{ width: 200, marginRight: '10px' }}
                onClick={(e) => handleClick(e, video.title, video.id)}
                cover={<img alt={video.title} src={video.image} />}
                actions={[
                  <DeleteTwoTone key='delete' style={{ fontSize: '25px' }} />
                ]}
              >
                <Meta title={video.title} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  // eslint-disable-next-line no-useless-return
  } else return <div style={{ position: 'absolute', height: '50%', width: '100%', left: '0%', top: '40%' }}><Empty /></div>
}

export default AllPlayList
