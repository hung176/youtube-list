import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../pages/Sidebar'
import SearchBar from '../../pages/SearchBar'
import './playvideo.css'
import { Layout } from 'antd'
const { Sider, Content, Header } = Layout

function PlayVideo () {
  const location = useLocation()
  const idVideo = location.state.idVideo

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
              <div className='video-play'>
                <iframe
                  src={`https://www.youtube.com/embed/${idVideo}`}
                  title={idVideo}
                  allowFullScreen
                />
              </div>
            </div>
          </Content>
        </Layout>

      </Layout>
    </div>
  )
}

export default PlayVideo
