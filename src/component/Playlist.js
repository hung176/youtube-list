import React, { useState } from 'react'
import { Input, Drawer, List } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { addPlaylistName } from '../states/playlistReducer'
import { filterPlaylist, getData } from '../states/filterplaylist'
import '../App.css'
import { Link } from 'react-router-dom'

const Playlist = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [nameItem, setNameItem] = useState('')

  const updatePlaylist = {
    id: Math.random(),
    title: nameItem,
    videos: []
  }

  const playlist = useSelector(state => state.playlist)
  const dispatch = useDispatch()

  const showDrawer = () => {
    dispatch(getData(playlist))
    setVisibleDrawer(true)
  }

  const onClose = () => {
    setVisibleDrawer(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const checkName = playlist.some(playlist => playlist.title === nameItem)
    if (!checkName) dispatch(addPlaylistName(updatePlaylist))
    setNameItem('')
  }

  const handleChange = (e) => setNameItem(e.target.value)

  return (
    <div>
      <div>
        <MenuFoldOutlined
          className='btn-play-list'
          onClick={showDrawer}
        />
      </div>

      <Drawer
        title='Play List'
        placement='right'
        width={200}
        closable={false}
        onClose={onClose}
        visible={visibleDrawer}
      >
        <form onSubmit={handleSubmit}>
          <label>Create new playlist</label>
          <Input
            type='text'
            value={nameItem}
            onChange={handleChange}
            style={{ marginTop: '10px' }}
          />
        </form>

        <List
          dataSource={playlist}
          renderItem={item => (
            <List.Item
              className='playlist-item'
              onClick={() => dispatch(filterPlaylist(item.title))}
            >
              <Link to='/allplaylist'><MenuFoldOutlined /> {item.title}</Link>
            </List.Item>
          )}
        />
      </Drawer>

    </div>
  )
}

export default Playlist
