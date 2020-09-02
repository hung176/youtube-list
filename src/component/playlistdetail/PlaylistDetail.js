import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Layout } from 'antd'
import { TwitterCircleFilled, FacebookFilled, PlayCircleOutlined } from '@ant-design/icons'
import './playlistdetail.css'

import { useSelector } from 'react-redux'
import { getPlaylists } from '../../states'

const { Sider, Content, Footer, Header } = Layout

export default function PlaylistDetail () {
  const playlistState = useSelector(getPlaylists)
  const [playlistSelected] = playlistState.playlistSelected
  const videos = playlistSelected.videos

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
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360, display: 'flex' }}>
              <div className='video-avatar'>
                <img src={videos[0].image} alt={videos[0].videoTitle} />
                <h4>{videos[0].videoTitle}</h4>
              </div>
              <div>
                {videos.map(video => (
                  <div key={video.idVideo} className='video-in-playlist'>
                    <img src={video.imageSmall} alt={video.videoTitle} />
                    <h4>{video.videoTitle}</h4>
                  </div>
                ))}
              </div>
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
