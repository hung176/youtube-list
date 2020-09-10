import React, { useState } from 'react'
import './showvideos.css'
import { PlusCircleOutlined, PlayCircleOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Modal, List, Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import Loading from '../loading/Loading'
import
{
  getVideos,
  selectVideoItem,
  createPlaylistName,
  getPlaylists,
  addVideoToPlaylist
} from '../../states'

export default function VideoListDefault () {
  const { isFetching, videos, selectVideo } = useSelector(getVideos)
  const playlists = useSelector(getPlaylists)
  const playlistItem = Object.values(playlists)

  const dispatch = useDispatch()
  const { push } = useHistory()

  const [visibleModel, setVisibleModel] = useState(false)
  const [namePlaylist, setNamePlaylist] = useState('')
  const [idPlaylist, setIdPlaylist] = useState(null)

  const handleGetVideo = (item) => {
    const InforVideo = {
      idVideo: item.id.videoId,
      videoTitle: item.snippet.title,
      image: item.snippet.thumbnails.medium.url,
      imageSmall: item.snippet.thumbnails.default.url,
      imageLarge: item.snippet.thumbnails.high.url
    }
    dispatch(selectVideoItem(InforVideo))
    showModal()
  }

  const showModal = () => setVisibleModel(true)

  const onChange = (e, id) => {
    const status = e.target.checked
    status ? setIdPlaylist(id) : setIdPlaylist(null)
  }

  const handleOk = e => {
    dispatch(addVideoToPlaylist(idPlaylist, selectVideo))
    setIdPlaylist(null)
    setVisibleModel(false)
  }

  const handleCancel = e => {
    setVisibleModel(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClick()
  }

  const handleClick = () => {
    if (namePlaylist !== '') {
      dispatch(createPlaylistName(uuidv4(), namePlaylist))
      setNamePlaylist('')
    }
  }

  const handlePlay = (item) => {
    push(`/playvideo/${item.id.videoId}`)
    dispatch(selectVideoItem(item))
  }

  return (
    <div>

      <div className='container-videoItem'>
        {isFetching && <div style={{ position: 'absolute', top: '50%' }}><Loading /></div>}
        {videos.map(item => (
          <div className='videoItem' key={item.id.videoId}>
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className='imageItem'
            />
            <h4>{item.snippet.title}</h4>

            <PlusCircleOutlined
              className='btn btn-add'
              onClick={() => handleGetVideo(item)}
            />

            <PlayCircleOutlined
              className='btn btn-play'
              onClick={() => handlePlay(item)}
            />
          </div>
        ))}
      </div>

      <Modal
        visible={visibleModel}
        centered
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
        width={350}
      >
        <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
          <Input
            placeholder='Create new playlist'
            style={{ marginBottom: '20px' }}
            value={namePlaylist}
            onChange={(e) => setNamePlaylist(e.target.value)}
          />
          <PlusCircleFilled
            style={{ fontSize: '30px', marginLeft: '12px' }}
            onClick={handleClick}
          />
        </form>

        <div>
          <List
            dataSource={playlistItem}
            size='large'
            renderItem={item => (
              <div key={item.id}>
                <Checkbox
                  checked={item.id === idPlaylist}
                  onChange={(e) => onChange(e, item.id)}
                  style={{ fontSize: '22px' }}
                >
                  {item.playlistTitle}
                </Checkbox>
              </div>
            )}
          />
        </div>
      </Modal>
    </div>
  )
}
