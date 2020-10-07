import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Api from '../../../apis/Api';
//imported comps
import AddVideoModal from '../common/AddVideoModal/AddVideoModal';
import VideoItem from '../common/VideoItem/VideoItem';

const ManageVideos = () => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //local comp state
  const [videos, setVideos] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [videoType, setVideoType] = useState('all')

  const getVideos = async () => {
    const response = await Api.get(`/videos?type=${videoType}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    setVideos(response.data);
  }

  useEffect(() => {
    getVideos();
  }, [videoType])

  const onAddVideoClick = () => {
    setShowAddVideo(true)
  }

  const onVideoTypeClick = (e) => {
    setVideoType(e.target.value)
  }

  return (
    <div className="uk-section uk-section-default">
      <div className="uk-container">
        <div data-uk-grid>
          <div className="uk-width-expand d-flex align-items-center">
            <h2 className="m-0 p-0">Company Videos</h2>
            <span className="text-light-grey ml-3 pointer" data-uk-icon="icon: plus-circle; ratio: 1.3" onClick={onAddVideoClick}></span>
          </div>
          <div className="uk-width-1-3 uk-text-right uk-light">
            <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-primary" onChange={onVideoTypeClick}>
              <option value="all">All Videos</option>
              <option value="company">Company Videos</option>
              <option value="users">Users Videos</option>
            </select>
          </div>
        </div>

        <div className="uk-child-width-1-2 uk-child-width-1-4@s" data-uk-grid>
          {videos.map(video => <VideoItem key={video._id} video={video} getUserVideos={getVideos} />)}
        </div>

      </div>

      <AddVideoModal showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} getUserVideos={getVideos} type="company" />

    </div>
  )
}

export default ManageVideos
