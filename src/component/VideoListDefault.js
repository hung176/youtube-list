import React from 'react'
import { Row, Col } from 'antd'
import VideoItems from './VideoItems'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import Loading from './Loading'
import { getVideos } from '../states'

export default function VideoListDefault () {
  const { isFetching, videos } = useSelector(getVideos)

  const { push } = useHistory()
  const playVideo = (idVideo) => {
    push(`/playvideo/${idVideo}`, { idVideo })
  }

  return (
    <div>
      {isFetching && <div style={{ position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%, 0%)' }}><Loading /></div>}
      <Row
        gutter={[16, { xs: 16, sm: 16, md: 24, lg: 32 }]}
      >
        {videos.map(item => (
          <Col
            className='gutter-row'
            xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }}
            key={item.id.videoId}
          >
            <VideoItems
              idVideo={item.id.videoId}
              thumbnailsUrl={item.snippet.thumbnails}
              title={item.snippet.title}
              playVideo={() => playVideo(item.id.videoId)}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}
