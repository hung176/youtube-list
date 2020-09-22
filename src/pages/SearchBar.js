import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { SearchOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../App.css'
import { AutoComplete, Button } from 'antd'

import { SearchVideo } from '../states'
// import { suggest } from '../../api/suggest'

// const { Option } = AutoComplete

export default function SearchBar () {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [queries, setQueries] = useState('')
  // const [option, setOption] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }

  const handleSearch = () => {
    dispatch(SearchVideo(queries))
    setQueries('')
    push('/')
  }

  const handleChange = (value) => {
    setQueries(value)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <AutoComplete
          className='search-form'
          size='large'
          onChange={(value) => handleChange(value)}
          value={queries}
          placeholder='Tìm kiếm...'
        >
          {/* {option.map((item, index) =>
            <Option
              key={index}
              value={item}
            >
              {item}
            </Option>)} */}
        </AutoComplete>
        <Button
          onClick={handleSearch}
          size='large'
        ><SearchOutlined />
        </Button>
      </form>
    </div>
  )
}
