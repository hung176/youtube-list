import React, { Component } from 'react';
import SearchBar from './component/SearchBar';
import VideoListDefault from './component/VideoListDefault';



class App extends Component {
  state = {
    result: [],
    loading: false,
    searchQuery: '',
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=reactjs&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ result: data.items, loading: false });
      })
    // fetch(` https://jsonplaceholder.typicode.com/posts`)  
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ result: data, loading:false});
    //   })
  }
  handleSubmit = (value) => {
    this.setState({loading: true});
    console.log(value)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${value}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ result: data.items, loading: false });
      })
  }
  render() {
    return (
      <div className="App">
        <SearchBar 
          result={this.state.result}
          handleSubmit = {this.handleSubmit}
          loading={this.state.loading}
        />
        
        <VideoListDefault
          listVideo={this.state.result}
        />
        
      </div>
    );
  }

}

export default App;
