import React from 'react'
import { Menu } from 'antd'
import { MenuFoldOutlined, YoutubeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { getPlaylists } from '../../states'

export default function Sidebar () {
  const { push } = useHistory()

  // const dispatch = useDispatch()
  const playlistState = useSelector(getPlaylists)
  const playlists = Object.values(playlistState)

  const handleClick = (item) => {
    item.videos.length === 0
      ? push('/empty')
      : push(`/playlist/${item.playlistTitle}`, { id: item.id })
  }

  return (
    <div>
      <div
        className='playlist-icon'
        style={{ cursor: 'pointer' }}
        onClick={() => push('/')}
      >
        <YoutubeOutlined
          style={{ color: 'red', fontSize: '55px' }}
        /> Youtube
      </div>

      <div className='playlist-menu'>
        <Menu defaultSelectedKeys={['4']}>
          {playlists.map(item => (
            <Menu.Item
              key={item.id}
              icon={<MenuFoldOutlined style={{ fontSize: '25px' }} />}
              style={{
                fontSize: '23px',
                display: 'flex',
                alignItems: 'center',
                color: '#273747',
                letterSpacing: '2px',
                marginBottom: '15px',
                marginLeft: '20px'
              }}
              onClick={() => handleClick(item)}
            >
              {item.playlistTitle}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  )
}
