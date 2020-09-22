import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import SearchBar from '../SearchBar'
import EmptyPage from '../../component/EmptyComponent'
import VideoItems from '../../component/VideoItems'
import { Layout, Row, Col, Button, Empty } from 'antd'
import { TwitterCircleFilled, FacebookFilled, EditOutlined } from '@ant-design/icons'
import './playlistdetail.css'

import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  getPlaylists,
  editPlaylistName,
  addDescription,
  deleteVideoFromPlaylist
} from '../../states'

const { Sider, Content, Footer, Header } = Layout

export default function PlaylistDetail () {
  const [disabledInput, setDisabledInput] = useState(true)
  const [videoId, setVideoId] = useState(null)
  const inputRef = React.createRef()

  const dispatch = useDispatch()
  const location = useLocation()

  const playlist = useSelector(getPlaylists)
  const id = location.state.id
  let playlistItem = playlist[id]

  // if delete playlistItem is undefined
  if (playlistItem === undefined) {
    playlistItem = {
      videos: [],
      playlistTitle: '',
      description: ''
    }
  }
  const { videos, playlistTitle, description } = playlistItem

  useEffect(() => {
    if (!disabledInput && videos.length !== 0) {
      inputRef.current.focus()
    }
  }, [inputRef, disabledInput, videos.length])

  const handleChange = (e) => {
    const newName = e.target.value
    dispatch(editPlaylistName(id, newName))
  }

  const handleDescription = (e) => {
    dispatch(addDescription(id, e.target.value))
  }

  const handleDeleteVideo = (id, idVideo) => {
    dispatch(deleteVideoFromPlaylist(id, idVideo))
  }

  if (videos.length === 0 && playlistTitle === '') return (<Empty description='Not Found' />)
  else if (videos.length === 0 && playlistTitle) return (<EmptyPage />)
  else {
    return (
      <div>
        <Layout>
          <Sider
            breakpoint='md'
            collapsedWidth='0'
            style={{ height: '100vh' }}
            theme='light'
          >
            <Sidebar />
          </Sider>

          <Layout>
            <Header
              className='site-layout-sub-header-background'
            >
              <SearchBar />
            </Header>

            <Content style={{ margin: '24px 16px 0' }}>
              <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
                <div className='edit-input'>
                  <input
                    type='text'
                    value={playlistTitle}
                    onChange={handleChange}
                    disabled={disabledInput}
                    ref={inputRef}
                  />
                  <EditOutlined
                    className='edit-icon'
                    onClick={() => setDisabledInput(false)}
                  />
                  <div>
                    <Button
                      type='primary'
                      shape='round'
                    >Tổng cộng có {videos.length} videos
                    </Button>
                  </div>

                </div>
                <div className='edit-describe'>
                  <textarea
                    placeholder='Thêm miêu tả cho playlist...'
                    value={description}
                    onChange={handleDescription}
                  />
                </div>
                <div className='video-avatar'>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={videoId}
                    allowFullScreen
                  />
                </div>
                <Row
                  gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
                >
                  {videos && videos.map(video => (
                    <Col
                      className='gutter-row'
                      xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 8 }}
                      key={video.idVideo}
                    >
                      <VideoItems
                        idVideo={video.idVideo}
                        thumbnailsUrl={video.thumbnailsUrl}
                        title={video.title}
                        playVideoFromPlayList={() => setVideoId(video.idVideo)}
                        id={id}
                        handleDeleteVideo={handleDeleteVideo}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', fontSize: '30px' }}>
              <TwitterCircleFilled style={{ marginRight: '20px' }} />
              <FacebookFilled />
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}
