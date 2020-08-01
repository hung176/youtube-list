import React, { Component } from 'react';
import SearchBar from './component/SearchBar';
import { LoadingOutlined } from '@ant-design/icons';


class App extends Component {
  state = {
    result: [],
    loading: false,
    searchQuery: ''
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.searchQuery !== this.state.searchQuery) {
      this.setState({ loading: true });
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.searchQuery}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ result: data.items, loading: false });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <SearchBar 
          searchQuery={this.state.searchQuery}
          result={this.state.result}
          handleChange = {value => this.setState({searchQuery: value})}
        />

        {this.state.loading && (
          <div>
            <LoadingOutlined style={{"fontSize":"50px"}} />
          </div>
        )}
        
        {this.state.result.map(item => (
          <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
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
