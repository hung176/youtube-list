import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../App.css'
import { AutoComplete, Button } from 'antd'
import Icon from '../style/Icon'

import { SearchVideo } from '../states'
import fetchingData from '../api/fetchingData'

const { Option } = AutoComplete

export default function SearchBar () {
  const dispatch = useDispatch()
  const [queries, setQueries] = useState('')
  const [option, setOption] = useState([])

  useEffect(() => {
    fetchingData(queries).then(video => setOption(video.items))
  }, [queries])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(SearchVideo(queries))
  }
  return (
    <div className='search-bar'>
      <Icon />
      <form onSubmit={handleSubmit}>
        <AutoComplete
          className='search-form'
          size='large'
          onChange={(value) => setQueries(value)}
          value={queries}
          placeholder='Enter some text here...'
        >
          {option.map((item, index) =>
            <Option
              key={index}
              value={item.snippet.title}
            >
              {item.snippet.title}
            </Option>)}
        </AutoComplete>
        <Button
          size='large'
          type='onsubmit'
        ><SearchOutlined />
        </Button>
      </form>
    </div>
  )
}
