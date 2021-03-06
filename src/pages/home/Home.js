import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import { fetchVideos, getQueries } from '../../states'

import SearchBar from '../SearchBar'
import VideoListDefault from '../../component/VideoListDefault'
import Sidebar from '../Sidebar'
import './home.css'

import { Layout } from 'antd'
const { Header, Content, Sider } = Layout

export default function Home () {
  const dispatch = useDispatch()
  const queries = useSelector(getQueries)

  useEffect(() => {
    if (queries !== '') {
      console.log('useEffect1 has called')
      compose(dispatch, fetchVideos)(queries)
    }
  }, [dispatch, queries])

  return (
    <Layout>

      <Sider
        breakpoint='md'
        collapsedWidth='0'
        theme='light'
        style={{
          left: 0
        }}
      >
        <Sidebar />
      </Sider>

      <Layout>
        <Header className='site-layout-sub-header-background' style={{ padding: 0 }}>
          <SearchBar />
        </Header>

        <Content>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
            <VideoListDefault />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
