import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Layout, Card, Row, Col } from 'antd'
import { TwitterCircleFilled, FacebookFilled } from '@ant-design/icons'
import './playlistdetail.css'

import { useSelector } from 'react-redux'
import { getPlaylists } from '../../states'

const { Sider, Content, Footer, Header } = Layout
const { Meta } = Card

export default function PlaylistDetail () {
  const playlistState = useSelector(getPlaylists)
  const [playlistSelected] = playlistState.playlistSelected
  const videos = playlistSelected.videos

  const [videoId, setVideoId] = useState(videos[0].idVideo)
  const [videoTitle, setVideoTitle] = useState(videos[0].videoTitle)

  const handleClick = (id, title) => {
    setVideoId(id)
    setVideoTitle(title)
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
            style={{ padding: 0, textAlign: 'center', fontSize: '20px', color: '#273747' }}
          >
            <h2>{playlistSelected.playlistTitle}</h2>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
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
                {videos.map(video => (
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
