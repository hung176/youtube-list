import React from 'react'
import { Menu, Modal } from 'antd'
import { DeleteFilled, YoutubeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { getPlaylists, deletePlaylist } from '../states'

const { confirm } = Modal

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

  // Modal delete playlist
  function showConfirm (id, name) {
    confirm({
      title: `Do you Want to delete playlist ${name}?`,
      icon: <ExclamationCircleOutlined />,
      onOk () {
        dispatch(deletePlaylist(id))
      }
    })
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
                  onClick={() => showConfirm(item.id, item.playlistTitle)}
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
