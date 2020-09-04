import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './playvideo.css'
import { Layout, Card, Row, Col } from 'antd'

import { useSelector } from 'react-redux'
import { getVideos } from '../../states'

const { Sider, Content } = Layout
const { Meta } = Card

function PlayVideo () {
  const videoState = useSelector(getVideos)
  const videoSelected = videoState.selectVideo
  const videos = videoState.videos

  const [videoId, setVideoId] = useState(videoSelected.id.videoId)

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

        <Content style={{ margin: '24px 16px 0' }}>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360}}>
            <div className='video-play'>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={videoSelected.snippet.title}
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
                  onClick={() => setVideoId(video.id.videoId)}
                  key={video.id.videoId}
                >
                  <Card
                    hoverable
                    cover={<img alt={video.snippet.title} src={video.snippet.thumbnails.medium.url} />}
                  >
                    <Meta title={video.snippet.title} description='www.youtube.com' />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>

      </Layout>
    </div>
  )
}

export default PlayVideo
