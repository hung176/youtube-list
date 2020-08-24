import React, { useState } from 'react'
import '../App.css'
import '../style/VideoItem.css'
import { PlusCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clickVideo } from '../states/videoReducer'
import { addVideoToPlaylist, checkboxPlaylist } from '../states/playlistReducer'
import { Modal, List, Checkbox } from 'antd'

const VideoListDefault = ({ listVideo }) => {
  const [visibleModel, setVisibleModel] = useState(false)
  const dispatch = useDispatch()
  const video = useSelector(state => state.video)
  const playlist = useSelector(state => state.playlist)

  const showModal = () => setVisibleModel(true)
  const handleOk = e => {
    setVisibleModel(false)
    dispatch(addVideoToPlaylist(video))
  }
  const handleCancel = e => setVisibleModel(false)

  const handleClick = (item) => {
    showModal()
    dispatch(clickVideo(item))
  }

  const onChange = (e, title) => {
    dispatch(checkboxPlaylist({ title, status: e.target.checked }))
  }

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
            onClick={() => handleClick(item)}
          />

          <PlayCircleOutlined className='btn btn-play' />
        </div>
      // <div key={item.id}>{item.title}</div>
      ))}

      <Modal
        visible={visibleModel}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={330}
      >
        <div>
          <List
            dataSource={playlist}
            size='large'
            renderItem={item => (
              <div>
                <Checkbox
                  checked={item.checked}
                  onChange={(e) => onChange(e, item.title)}
                  style={{ fontSize: '22px' }}
                >
                  {item.title}
                </Checkbox>
              </div>
            )}
          />
        </div>
      </Modal>
    </div>
  )
}
export default VideoListDefault
