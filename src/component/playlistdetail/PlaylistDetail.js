import React, { useState, useRef } from 'react'
import Sidebar from '../sidebar/Sidebar'
import SearchBar from '../searchbar/SearchBar'
import { Layout, Card, Row, Col, Button } from 'antd'
import { TwitterCircleFilled, FacebookFilled, EditOutlined } from '@ant-design/icons'
import './playlistdetail.css'

import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPlaylists, editPlaylistName, addDescription } from '../../states'

const { Sider, Content, Footer, Header } = Layout
const { Meta } = Card

export default function PlaylistDetail () {
  const dispatch = useDispatch()
  const location = useLocation()
  const myInp = useRef(null)

  const playlist = useSelector(getPlaylists)
  const id = location.state.id
  const playlistItem = playlist[id]

  const { videos, playlistTitle, description } = playlistItem

  const [videoId, setVideoId] = useState(videos[0].idVideo)
  const [videoTitle, setVideoTitle] = useState(videos[0].videoTitle)
  const [disabledInput, setDisabledInput] = useState(false)

  const handleClick = (id, title) => {
    setVideoId(id)
    setVideoTitle(title)
  }

  const handleChange = (e) => {
    const newName = e.target.value
    dispatch(editPlaylistName(id, newName))
  }

  const handleInput = () => {
    setDisabledInput(false)
    myInp.current.focus()
  }

  const handleDescription = (e) => {
    dispatch(addDescription(id, e.target.value))
  }
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
                  ref={myInp}
                />
                <EditOutlined
                  className='edit-icon'
                  onClick={handleInput}
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
                    onClick={() => handleClick(video.idVideo, video.videoTitle)}
                    key={video.idVideo}
                  >
                    <Card
                      hoverable
                      cover={<img alt={video.videoTitle} src={video.image} />}
                    >
                      <Meta title={video.videoTitle} description='www.youtube.com' />
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
