import React, { useState } from 'react'
import { Modal, List, Checkbox, Input } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'

function ModalPlaylist (props) {
  const {
    visibleModel,
    handleOk,
    handleCancel,
    handleSubmit,
    handleClick,
    playlistItem,
    onChange
  } = props

  return (
    <div>
      <Modal
        visible={visibleModel}
        centered
        onOk={handleOk}
        closable={false}
        onCancel={handleCancel}
        width={350}
      >
        <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
          <Input
            placeholder='Create new playlist'
            style={{ marginBottom: '20px' }}
            // value={namePlaylist}
            // onChange={(e) => setNamePlaylist(e.target.value)}
          />
          <PlusCircleTwoTone
            style={{ fontSize: '30px', marginLeft: '12px' }}
            onClick={handleClick}
          />
        </form>

        <div>
          <List
            dataSource={playlistItem}
            size='large'
            renderItem={item => (
              <div key={item.id}>
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => onChange(e, item.id)}
                  style={{ fontSize: '22px' }}
                >
                  {item.playlistTitle}
                </Checkbox>
              </div>
            )}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ModalPlaylist
