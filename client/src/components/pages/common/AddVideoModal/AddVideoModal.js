import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import Api from '../../../../apis/Api';
//imported comps
import CustomPopover from '../CustomPopover/CustomPopover';
import ImageCropper from '../ImageCropper/ImageCropper';

const AddVideo = ({ showAddVideo, setShowAddVideo, type, getUserVideos, video }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //com local state
  const [cover, setCover] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState('');

  useEffect(() => {
    if (video) {
      setUrl(video.url);
      setTitle(video.title);
      setCover(video.cover);
    }
  }, [])

  const onModalHide = () => {
    setUrl('')
    setTitle('')
    setCover('')
    setShowAddVideo(false);
  }

  const onAddClick = async () => {
    const newErrors = {};
    if (!cover) newErrors.cover = 'Please upload a video Cover';
    if (!url) newErrors.url = 'Please enter the video URL';
    if (!title) newErrors.title = 'Please enter the video Title';
    if (url && !matchYoutubeUrl(url)) newErrors.url = 'Please enter a valid YouTube URL';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    else setErrors({});

    const data = { cover, url, title, type };
    if (video) data.id = video._id;

    const response = await Api.post('/videos/add', data, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    if (response.data.error) {
      return setResponseError(response.data.error);
    } else setResponseError('');

    console.log(response.data);
    getUserVideos();
    setShowAddVideo(false);
  }

  const onCropFinish = (image) => {
    setCover(image)
    document.body.click()
  }

  return (
    <Modal show={showAddVideo} onHide={onModalHide} centered className="modal-primary" >
      <Modal.Header closeButton>
        <div className="pr-5">
          <Modal.Title>Add Your Video</Modal.Title>
          <p className="text-md">Consumers like Videos because it’s easy to digest, entertaining and engaging.</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-md pb-2"><strong>Videos thrive when it comes to standing out from the crowd.</strong></h5>

        <div className="d-flex justify-content-between align-items-center px-4 py-2 mb-3 cover-area">
          <CustomPopover
            trigger={<Button variant="outline-secondary" size="sm">Add video Cover</Button>}
            content={<ImageCropper aspectRatio={3 / 4} onCropFinish={onCropFinish} />}
            placement="right"
            title="Add video cover"
            rootClose={false}
          />
          <img src={cover ? cover : require('../../../../images/video-cover.jpg')} style={{ width: '50px' }} />
        </div>
        {errors.cover && <div className="error" style={{ color: 'red' }}>{errors.cover}</div>}

        <Form.Group controlId="formBasicName">
          <Form.Control type="text" placeholder="Video Url" value={url} onChange={e => setUrl(e.target.value)} />
          {errors.url && <div className="error" style={{ color: 'red' }}>{errors.url}</div>}
        </Form.Group>

        <Form.Group controlId="formBasicLastname">
          <Form.Control type="text" placeholder="Video Title" value={title} onChange={e => setTitle(e.target.value)} />
          {errors.title && <div className="error" style={{ color: 'red' }}>{errors.title}</div>}
        </Form.Group>

        <div className="d-flex justify-content-center pt-4">
          <Button variant="primary" size="lg" type="button" onClick={onAddClick}>
            {video ? 'Save' : 'Add Video'}
          </Button>
        </div>
        {responseError && <div className="d-flex justify-content-center pt-4">
          <div className="error" style={{ color: 'red' }}>{responseError}</div>
        </div>}
      </Modal.Body>
    </Modal >
  )
}

//function to check if the url is a youtube url.
function matchYoutubeUrl(url) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
}

export default AddVideo
