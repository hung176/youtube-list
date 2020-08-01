import React, { Component } from 'react';
import SearchBar from './component/SearchBar';
import { LoadingOutlined } from '@ant-design/icons';
import VideoListDefault from './component/VideoListDefault';


class App extends Component {
  state = {
    result: [],
    loading: false,
    searchQuery: ''
  }

  componentDidMount() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=reactjs&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ result: data.items, loading: false });
      })
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
        
          <VideoListDefault
          listVideo={this.state.result}
        />
        
      </div>
    );
  }

}

export default App;
