import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import Api from '../../../../apis/Api';
import AddVideoModal from '../AddVideoModal/AddVideoModal';
import history from '../../../../history';

const VideoItem = ({ video, getUserVideos }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //local comp state
  const [showAddVideo, setShowAddVideo] = useState(false)

  const onDeleteClick = async () => {
    const response = await Api.delete(`/videos/${video._id}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    console.log(response.data)
    getUserVideos()
  }

  return (
    <div >
      <div className="uk-card uk-card-video">
        <div className="uk-light">
          {/* <img className="uk-border-rounded-large" src="https://via.placeholder.com/300x400" alt="Course Title" /> */}
          <ReactPlayer className="img-fluid react-player" url={video.url} playsinline controls />
          {(history.location.pathname === '/dashboard' || history.location.pathname === '/profile') && <div className="uk-position-xsmall uk-position-top-right">
            <i className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="close" onClick={onDeleteClick}></i>
            <i className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="pencil" onClick={() => setShowAddVideo(true)}></i>
          </div>}
          {/* <div className="uk-position-center">
                  <span data-uk-icon="icon: play-circle; ratio: 3.4"></span>
                </div> */}
          <div className="uk-position-small uk-position-bottom-left">
            <h5 className="uk-margin-small-bottom">{video.title}</h5>
            {video.type === 'userVideo' && <div className="uk-text-xsmall">by {video.ownerData.name}</div>}
            {video.type === 'companyVideo' && <div className="uk-text-xsmall">by Gallon Recipes</div>}
          </div>
        </div>
      </div>
      <AddVideoModal showAddVideo={showAddVideo} setShowAddVideo={setShowAddVideo} getUserVideos={getUserVideos} type="user" video={video} />
    </div>
  )
}

export default VideoItem
