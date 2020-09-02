import React from 'react'
import { Menu } from 'antd'
import { MenuFoldOutlined, YoutubeOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { getPlaylists, selectedPlaylist } from '../../states'

export default function Sidebar () {
  const { push } = useHistory()

  const dispatch = useDispatch()
  const playlistState = useSelector(getPlaylists)
  const playlists = playlistState.playlist

  const handleClick = (item) => {
    dispatch(selectedPlaylist(item.id))
    push(`/playlist/${item.playlistTitle}`)
  }

  return (
    <div>
      <div className='playlist-icon'><YoutubeOutlined style={{ color: 'red', fontSize: '55px' }} /> Youtube </div>
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
