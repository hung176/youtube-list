import React, { useState } from 'react'
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
    setNamePlaylist('')
  }

  const handleChange = (e) => {
    setNamePlaylist(e.target.value)
  }

  return (
    <div>
      <div>
        <button
          className='btn-play-list'
          onClick={showDrawer}
        >
          <div style={{ marginBottom: '-9px' }}>Play</div>
          <div>List</div>
        </button>
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
            value={namePlaylist}
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
