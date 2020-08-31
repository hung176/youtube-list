import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import { fetchVideos, getQueries } from '../../states'

import SearchBar from '../searchbar/SearchBar'
import VideoListDefault from '../showvideos/VideoListDefault'
import Sidebar from '../sidebar/Sidebar'
import './home.css'

import { Layout } from 'antd'
// import 'antd/dist/antd.css'
const { Header, Content, Sider } = Layout

export default function Home () {
  const dispatch = useDispatch()
  const queries = useSelector(getQueries)

  useEffect(() => {
    if (queries !== '') {
      console.log('useEffect1 has called')
      compose(dispatch, fetchVideos)(queries)
    }
  }, [queries])

  return (
    <Layout>

      <Sider
        breakpoint='md'
        collapsedWidth='0'
        theme='light'
        // onBreakpoint={broken => {
        //   console.log(broken)
        // }}
        // onCollapse={(collapsed, type) => {
        // }}
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
