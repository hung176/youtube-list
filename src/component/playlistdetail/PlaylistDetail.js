import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import SearchBar from '../searchbar/SearchBar'
import EmptyPage from '../empty/EmptyComponent'
import {
  Layout, Card, Row, Col, Button, Empty
} from 'antd'
import {
  TwitterCircleFilled,
  FacebookFilled,
  EditOutlined,
  DeleteFilled,
  PlusCircleFilled,
  InteractionFilled
} from '@ant-design/icons'
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
const { Meta } = Card

export default function PlaylistDetail () {
  const [disabledInput, setDisabledInput] = useState(true)
  const [videoId, setVideoId] = useState(null)
  const [videoTitle, setVideoTitle] = useState(null)
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
    } else {
      // Throw error 404, beer not found
    }
  }, [inputRef, disabledInput, videos.length])

  const handleClickToFrame = (id, title) => {
    setVideoId(id)
    setVideoTitle(title)
  }

  const handleChange = (e) => {
    const newName = e.target.value
    dispatch(editPlaylistName(id, newName))
  }

  const handleDescription = (e) => {
    dispatch(addDescription(id, e.target.value))
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
                    title={videoTitle}
                    allowFullScreen
                  />
                </div>
                <Row
                  gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
                >
                  {videos && videos.map(video => (
                    <Col
                      className='gutter-row'
                      xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}
                      key={video.idVideo}
                    >
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={video.videoTitle}
                            src={video.image}
                            onClick={() => handleClickToFrame(video.idVideo, video.videoTitle)}
                          />
                        }
                        actions={[
                          <DeleteFilled
                            key='delete'
                            style={{ fontSize: '23px' }}
                            onClick={() => dispatch(deleteVideoFromPlaylist(id, video.idVideo))}
                          />,
                          <PlusCircleFilled
                            key='add'
                            style={{ fontSize: '23px' }}
                          />,
                          <InteractionFilled
                            key='switch'
                            style={{ fontSize: '23px' }}
                          />
                        ]}
                      >
                        <Meta title={video.videoTitle} />
                      </Card>
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
