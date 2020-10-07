import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../../apis/Api';
//imported comps
import AddVideoModal from '../common/AddVideoModal/AddVideoModal';
import VideoItem from '../common/VideoItem/VideoItem';

const VideoSection = () => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //local comp state
  const [videos, setVideos] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(false)

  const getUserVideos = async () => {
    const response = await Api.get('/videos?type=user', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    console.log(response.data)
    setVideos(response.data);
  }

  useEffect(() => {
    getUserVideos();
  }, [])

  const onAddVideoClick = () => {
    setShowAddVideo(true)
  }

  // const VideoItem = 

  return (
    <div className="uk-section uk-section-default">
      <div className="uk-container">
        <div data-uk-grid>
          <div className="uk-width-expand d-flex align-items-center">
            <h2 className="m-0 p-0">My Videos</h2>
            <span className="text-light-grey ml-3 pointer" data-uk-icon="icon: plus-circle; ratio: 1.3" onClick={onAddVideoClick}></span>
          </div>
          {/* <div className="uk-width-1-3 uk-text-right uk-light">
            <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-primary">
              <option>Featured</option>
              <option>Top Rated</option>
              <option>Trending</option>
            </select>
          </div> */}
        </div>

        <div className="uk-child-width-1-2 uk-child-width-1-4@s" data-uk-grid>
          {videos.map(video => <VideoItem key={video._id} video={video} getUserVideos={getUserVideos} />)}
        </div>

      </div>

      <AddVideoModal showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} getUserVideos={getUserVideos} type="user" />

    </div>
  )
}

export default VideoSection
