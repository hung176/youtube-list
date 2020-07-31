import React, { Component } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import { AutoComplete, Button } from 'antd';
const {Option} = AutoComplete;



class App extends Component {
  state = {
    result: { 
      items: []
    },
    loading: false,
    searchQuery: ''
  }

  componentDidUpdate(_, previousState) {
    if (previousState.searchQuery !== this.state.searchQuery) {
      this.setState({ loading: true });
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ result: data, loading: false });
        });
    }
  }

  render() {
    // const options = this.state.result.items.map(item => item.snippet.title);
    return (
      <div className="App">
        <AutoComplete
          className="search_form"
          size={"large"}
          onChange={(value) => this.setState({ searchQuery: value })} 
          value={this.state.searchQuery}
        >
          { this.state.result.items.map((item, index)  => <Option key={ index } value={item.snippet.title}>{ item.snippet.title }</Option> ) }
        </AutoComplete>
        <Button size={"large"}><SearchOutlined /></Button>
         
        {this.state.loading && (
          <div>Loading ... </div>
        )}

        {this.state.result.items.map(item => (
          <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target="_blank">
            <div>
              <div>{item.snippet.title}</div>
              <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title}/>                
            </div>
          </a>
        ))}
      </div>
    );
  }

}

export default App;
