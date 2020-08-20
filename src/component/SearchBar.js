import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import '../App.css'
import { AutoComplete, Button } from 'antd'
import Icon from '../style/Icon'
const { Option } = AutoComplete

export default class SearchBar extends Component {
  state = {
    videos: [],
    searchQuery: ''
  }

  componentDidUpdate (_, previousState) {
    if (previousState.searchQuery !== this.state.searchQuery) {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.state.searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
      // fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(data => {
          this.setState({ videos: data.items })
          // this.setState({ videos: data })
        })
    }
  }

  // onSelect = value => {
  //   console.log(value)
  // }
  render () {
    return (
      <div className='search-bar'>
        <Icon loading={this.props.loading} />
        <AutoComplete
          className='search-form'
          size='large'
          onChange={(value) => this.setState({ searchQuery: value })}
          value={this.state.searchQuery}
          placeholder='Enter some text here...'
          // onSelect={this.onSelect}
        >
          {this.state.videos.map((item, index) =>
            <Option
              key={index}
              value={item.snippet.title}
              // value={item.title}
            >
              {item.snippet.title}
              {/* {item.title} */}
            </Option>)}
        </AutoComplete>
        <Button
          size='large'
          onClick={() => this.props.onSubmit(this.state.searchQuery)}
        ><SearchOutlined />
        </Button>
      </div>
    )
  }
}
