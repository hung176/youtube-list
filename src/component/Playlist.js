import React, { useState } from 'react'
import { Input, Drawer, List } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { addPlaylist } from '../states/playlistReducer'

const Playlist = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [nameItem, setNameItem] = useState('')
  const [nameList, setNameList] = useState([])

  const updatePlaylist = {
    id: Math.random(),
    title: nameItem,
    videos: []
  }
  const playlist = useSelector(state => {
    return state.addPlaylist
  })

  const dispatch = useDispatch()

  const showDrawer = () => {
    setVisibleDrawer(true)
  }

  const onClose = () => {
    setVisibleDrawer(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const listItem = [...nameList, nameItem]
    if (nameItem) setNameList(listItem)
    setNameItem('')
    dispatch(addPlaylist(updatePlaylist))
  }

  const handleChange = (e) => {
    setNameItem(e.target.value)
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
        width={400}
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
            <List.Item>
              {item.title}
            </List.Item>
          )}
        />
      </Drawer>

    </div>
  )
}

export default Playlist
