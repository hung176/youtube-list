import React from 'react'
import { Empty } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function EmptyPage () {
  return (
    <div>
      <Empty style={{
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)'
      }}
      />
      <Link to='/'>
        <div>
          <ArrowLeftOutlined
            style={{
              fontSize: '27px',
              position: 'absolute',
              top: '30px',
              left: '30px',
              cursor: 'pointer'
            }}
          />
          <span
            style={{
              fontSize: '25px',
              position: 'absolute',
              top: '22px',
              left: '80px'
            }}
          >Home
          </span>
        </div>
      </Link>
    </div>
  )
}
