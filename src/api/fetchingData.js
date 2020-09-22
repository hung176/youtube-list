export default function fetchingData (queries) {
  return (
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${queries}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
  )
}
