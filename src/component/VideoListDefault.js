import React, { useState } from 'react'
import '../App.css'
import '../style/VideoItem.css'
import { PlusCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clickVideo } from '../states/videoReducer'
import { Modal, List, Checkbox } from 'antd'

const VideoListDefault = ({ listVideo }) => {
  const [visibleModel, setVisibleModel] = useState(false)
  const dispatch = useDispatch()
  const videoInfor = useSelector(state => state.video)
  const playlistName = useSelector(state => state.playlist)

  const showModal = () => setVisibleModel(true)
  const handleOk = e => setVisibleModel(false)
  const handleCancel = e => setVisibleModel(false)

  const handleClick = (item) => {
    showModal()
    dispatch(clickVideo(item))
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
        title='Add video to playlist below'
        visible={visibleModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <List
            dataSource={playlistName}
            size='large'
            renderItem={item => (
              <div>
                <Checkbox>
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
