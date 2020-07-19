import React, { Component } from 'react';
import './App.css';

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
    return (
      <div className="App">
        {this.state.loading && (
          <div>Loading ... </div>
        )}
        <input onChange={(ev) => this.setState({ searchQuery: ev.target.value })} value={this.state.searchQuery} />
        {this.state.searchQuery}
        {this.state.result.items.map(item => (
          <a key={item.id.videoId} href={`https://www.youtube.com/watch?v=${item.id.videoId}`} target="_blank">
            <div>
              <div>{item.snippet.title}</div>
              <img src={item.snippet.thumbnails.high.url} />                
            </div>
          </a>
        ))}
      </div>
    );
  }

}

export default App;
