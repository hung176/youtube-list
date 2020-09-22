import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PlayCircleFilled, PlusCircleFilled, DeleteFilled } from '@ant-design/icons'
import { Modal, List, Checkbox, Input, Card } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import '../App.css'

import {
  getPlaylists,
  createPlaylistName,
  addVideoToPlaylists
} from '../states'

const { Meta } = Card

function VideoItems ({
  idVideo,
  thumbnailsUrl,
  title,
  playVideoFromPlayList,
  playVideo,
  id,
  handleDeleteVideo
}) {
  const [visibleModal, setVisibleModal] = useState(false)
  const [namePlaylist, setNamePlaylist] = useState('')
  const dispatch = useDispatch()
  const [playlistIdStatuses, setPlaylistIdStatuses] = useState({})

  const playlists = useSelector(getPlaylists)
  const playlistItem = Object.values(playlists)

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

  const handleOk = () => {
    Object
      .entries(playlistIdStatuses)
      .filter(val => val[1] === true).map(val => val[0])
      .forEach(playlistId => {
        dispatch(addVideoToPlaylists(playlistId, { idVideo, thumbnailsUrl, title }))
      })
    setVisibleModal(false)
  }

  const isVisibleDelete = id ? 'visible' : 'hidden'

  const onClickPlay = id ? playVideoFromPlayList : playVideo

  return (
    <div>
      <Card
        hoverable
        // loading={}
        cover={
          <img
            alt={title}
            src={thumbnailsUrl.medium.url}
          />
        }
        actions={[
          <PlusCircleFilled
            key='add'
            style={{ fontSize: '30px' }}
            onClick={() => setVisibleModal(true)}
          />,
          <DeleteFilled
            key='delete'
            style={{ fontSize: '30px' }}
            className={isVisibleDelete}
            onClick={() => handleDeleteVideo(id, idVideo)}
          />,
          <PlayCircleFilled
            key='play'
            style={{ fontSize: '30px' }}
            onClick={onClickPlay}
          />
        ]}
      >
        <Meta
          title={title}
        />
      </Card>

      <Modal
        visible={visibleModal}
        centered
        onOk={handleOk}
        closable={false}
        onCancel={() => setVisibleModal(false)}
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
                  checked={playlistIdStatuses[item.id]}
                  onChange={() => {
                    setPlaylistIdStatuses({
                      ...playlistIdStatuses,
                      [item.id]: !playlistIdStatuses[item.id]
                    })
                  }}
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

export default VideoItems
