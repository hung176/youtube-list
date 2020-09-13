import React from 'react'
import { Menu } from 'antd'
import { DeleteFilled, YoutubeOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { getPlaylists, deletePlaylist } from '../../states'

export default function Sidebar () {
  const { push } = useHistory()

  const dispatch = useDispatch()
  const allPlaylist = useSelector(getPlaylists)
  const playlists = Object.values(allPlaylist)

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
              icon={
                <DeleteFilled
                  style={{ fontSize: '20px' }}
                  onClick={() => dispatch(deletePlaylist(item.id))}
                />
              }
              style={{
                fontSize: '23px',
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#273747',
                letterSpacing: '1px',
                marginBottom: '15px'
              }}
            >
              <span onClick={() => handleClick(item)}>{item.playlistTitle} </span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  )
}
