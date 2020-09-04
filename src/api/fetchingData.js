export default function fetchingData (queries) {
  return (
    // fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${queries}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${queries}&type=video&key=AIzaSyDu0ojnk1z9SMpcJxYdkU2iewsXvlUXD-k`)
  )
}
