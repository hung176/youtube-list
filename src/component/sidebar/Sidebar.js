import React from 'react'
import { Menu } from 'antd'
import { MenuFoldOutlined, YoutubeOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { getPlaylists } from '../../states'

function Sidebar () {
  const playlist = useSelector(getPlaylists).playlist

  return (
    <div>
      <div className='playlist-icon'><YoutubeOutlined style={{ color: 'red', fontSize: '55px' }} /> Youtube </div>
      <div className='playlist-menu'>
        <Menu defaultSelectedKeys={['4']}>
          {playlist.map(item => (
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
              onClick={() => console.log(playlist)}
            >
              {item.playlistTitle}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar
