import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Input, Drawer, List, Button } from 'antd'

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
      <div className='Play-list'>
        <Button
          type='danger'
          id='btn'
          shape='circle'
          icon={<PlusOutlined />}
          size='large'
          onClick={showDrawer}
        />
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
