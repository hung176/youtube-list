import React, { Component } from 'react';
import { SearchOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../App.css';
import { AutoComplete, Button } from 'antd';
import { Typography } from 'antd';
const {Option} = AutoComplete;
const {Text} = Typography;


export default class SearchBar extends Component {
  
  render() {
    return (
      <div className="search-bar">
        <Text 
          className="icon"
          strong type="danger"
        > YOUTUBE
        </Text>
        <AutoComplete
          className="search-form"
          size={"large"}
          onChange={(value) => this.props.handleChange(value)} 
          value={this.props.searchQuery}
          placeholder="Enter some text here..."
        >
          {this.props.result.map((item, index)  => <Option key={index} value={item.snippet.title}>{item.snippet.title}</Option> )}
        </AutoComplete>
        <Button size={"large"}><SearchOutlined /></Button>
      </div>
    )
  }
}
