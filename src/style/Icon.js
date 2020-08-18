import React from 'react'
import './Icon.css'
import classNames from 'classnames'

const Icon = (props) => {
  const classname = classNames({
    box: props.loading,
    'box-normal': !props.loading
  })
  return (
    <div className={classname}>
      <div className='you'> YOU</div>
      <div className='tube'> TUBE</div>
    </div>
  )
}

export default Icon
