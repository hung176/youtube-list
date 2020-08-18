import React, { useState } from 'react'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { Input, Drawer, List } from 'antd'

const Playlist = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [namePlaylist, setNamePlaylist] = useState('')
  const [playlist, setPlaylist] = useState([])

  const showDrawer = () => {
    setVisibleDrawer(true)
  }

  const onClose = () => {
    setVisibleDrawer(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const listItem = [...playlist, namePlaylist]
    if (namePlaylist) setPlaylist(listItem)
  }

  const handleChange = (e) => {
    setNamePlaylist(e.target.value)
  }

  return (
    <div>

      <div className='btnPlaylistForm' onClick={showDrawer}>
        <MenuUnfoldOutlined
          className='btnPlaylist'
        />
        <span style={{ marginTop: '2px', fontSize: '20px' }}>Playlist</span>
      </div>

      <Drawer
        title='Play List'
        placement='right'
        width={500}
        closable={false}
        onClose={onClose}
        visible={visibleDrawer}
      >
        <form onSubmit={handleSubmit}>
          <label>Create new playlist</label>
          <Input
            type='text'
            onChange={handleChange}
            style={{ marginTop: '10px' }}
          />
        </form>

        <List
          dataSource={playlist}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Drawer>

    </div>
  )
}

export default Playlist
