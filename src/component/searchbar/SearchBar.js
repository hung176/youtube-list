import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../../App.css'
import { AutoComplete, Button } from 'antd'

import { SearchVideo } from '../../states'

const { Option } = AutoComplete

export default function SearchBar () {
  const dispatch = useDispatch()
  const [queries, setQueries] = useState('')
  // const [option, setOption] = useState([])
  const option = ['a', 'b']

  // useEffect(() => {
  //   if (queries !== '') {
  //     console.log('useEffect2 has called')
  //     fetch(`http://clients1.google.com/complete/search?hl=en&output=toolbar&q=mikami`)
  //       .then(data => console.log(data))
  //   }
  // }, [queries])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(SearchVideo(queries))
    setQueries('')
  }
  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <AutoComplete
          className='search-form'
          size='large'
          onChange={(value) => setQueries(value)}
          value={queries}
          placeholder='Tìm kiếm...'
        >
          {option.map((item, index) =>
            <Option
              key={index}
              value={item}
            >
              {item}
            </Option>)}
        </AutoComplete>
        <Button
          type='submit'
          size='large'
        ><SearchOutlined />
        </Button>
      </form>
    </div>
  )
}
