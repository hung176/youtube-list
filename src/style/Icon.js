import React from 'react'
import { useSelector } from 'react-redux'
import './Icon.css'
import classNames from 'classnames'
import { getVideos } from '../states'

const Icon = () => {
  const { isFetching } = useSelector(getVideos)
  const classname = classNames({
    box: isFetching,
    'box-normal': !isFetching
  })
  return (
    <div className={classname}>
      <div className='you'> YOU</div>
      <div className='tube'> TUBE</div>
    </div>
  )
}

export default Icon
