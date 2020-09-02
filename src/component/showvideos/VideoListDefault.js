import React, { useState } from 'react'
import './showvideos.css'
import { PlusCircleOutlined, PlayCircleOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Modal, List, Checkbox, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import
{
  getVideos,
  createPlaylistName,
  getInforVideo,
  getPlaylists,
  checkedPlaylist,
  unCheckedPlaylist,
  addVideoToPlaylist
} from '../../states'

export default function VideoListDefault () {
  const { videos } = useSelector(getVideos)
  const { playlist } = useSelector(getPlaylists)
  const dispatch = useDispatch()

  const [visibleModel, setVisibleModel] = useState(false)
  const [namePlaylist, setNamePlaylist] = useState('')

  const handleGetVideo = (item) => {
    const InforVideo = {
      idVideo: item.id.videoId,
      videoTitle: item.snippet.title,
      image: item.snippet.thumbnails.medium.url,
      imageSmall: item.snippet.thumbnails.default.url,
      imageLarge: item.snippet.thumbnails.high.url
    }
    dispatch(getInforVideo(InforVideo))
    showModal()
  }

  const showModal = () => setVisibleModel(true)

  const onChange = (e, title) => {
    dispatch(checkedPlaylist({ title, status: e.target.checked }))
  }

  const handleOk = e => {
    dispatch(addVideoToPlaylist())
    setVisibleModel(false)
  }

  const handleCancel = e => {
    setVisibleModel(false)
    dispatch(unCheckedPlaylist(false))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPlaylistName(namePlaylist))
    setNamePlaylist('')
  }

  return (
    <div>
      <div className='container-videoItem'>
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

            <PlayCircleOutlined className='btn btn-play' />
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
            type='submit'
          />
        </form>

        <div>
          <List
            dataSource={playlist}
            size='large'
            renderItem={item => (
              <div>
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => onChange(e, item.playlistTitle)}
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
