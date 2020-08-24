import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeVideo } from '../states/playlistReducer'
import { removeVideoStateFiltered } from '../states/filterplaylist'
import { Card, Empty } from 'antd'
import { DeleteTwoTone, BackwardOutlined } from '@ant-design/icons'
import '../style/allplaylist.css'
import { Link } from 'react-router-dom'

const { Meta } = Card

function AllPlayList () {
  const playlistFiltered = useSelector(state => state.filterPlaylist)
  const dispatch = useDispatch()
  const [videoTitle, setVideoTitle] = useState('')
  const [videoId, setVideoId] = useState('')

  const handleClick = (e, title, id) => {
    setVideoTitle(title)
    setVideoId(id)
  }

  const handleDelete = (id) => {
    dispatch(removeVideo(id))
    dispatch(removeVideoStateFiltered(id))
  }

  if (playlistFiltered[0].videos.length !== 0) {
    var videos = playlistFiltered[0].videos
    const url = `https://www.youtube.com/embed/${videoId}`

    return (
      <div>
        <Link to='/'><div className='header-playlist'><BackwardOutlined />PLAYLIST</div></Link>
        <div className='iframe-player'>
          <iframe title={videoTitle} src={url} allowFullScreen />
          <div>{videoTitle}</div>
        </div>
        <div className='playlist-container'>
          <div className='card-video-container'>
            {videos.map(video => (
              <Card
                hoverable
                key={video.id}
                style={{ width: 200, marginRight: '10px' }}
                cover={<img alt={video.title} src={video.image} onClick={(e) => handleClick(e, video.title, video.id)} />}
                actions={[
                  <DeleteTwoTone
                    key='delete'
                    style={{ fontSize: '25px' }}
                    onClick={() => handleDelete(video.id)}
                  />
                ]}
              >
                <Meta title={video.title} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Link to='/'><div className='header-playlist'><BackwardOutlined />PLAYLIST</div></Link>
        <div style={{ position: 'absolute', height: '50%', width: '100%', left: '0%', top: '40%' }}>
          <Empty />
        </div>
      </div>
    )
  }
}

export default AllPlayList
