import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Api from '../../../apis/Api';
import { updateProfile } from '../../../actions/userActions';
//imported comps
import ImageUpload from '../common/ImageUpload/ImageUpload';
import CustomPopover from '../common/CustomPopover/CustomPopover';
import ImageCropper from '../common/ImageCropper/ImageCropper';

const CoverImage = () => {
  //redux store state
  const currentUser = useSelector(state => state.currentUser);
  const accessToken = useSelector(state => state.accessToken);
  const dispatch = useDispatch();
  //for uploading indicators
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState({})

  const onImageUploadClick = async (newImage) => {
    setUploading(false);

    const response = await Api.post('/updateprofile', { coverImage: newImage }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    dispatch(updateProfile(response.data));
    document.body.click()
  }

  return (
    <>
      <img align="left" className="cover-image" src={currentUser.coverImage || require("../../../images/profile 2.jpg")} alt="Profile image example" />
      <CustomPopover
        trigger={<span className="material-icons edit-cover-image">{uploading ? <Spinner className="mx-auto" animation="border" /> : 'create'}</span>}
        content={<ImageCropper aspectRatio={4} onCropFinish={onImageUploadClick} />}
        placement="left"
        title="Upload Cover Image"
        rootClose={false}
      />
      {/* <ImageUpload
        setUploadError={setUploadError}
        alertContainer="alert-container"
        trigger={
          <span className="material-icons edit-cover-image">{uploading ? <Spinner className="mx-auto" animation="border" /> : 'create'}</span>
        }
        onImageUploadClick={onImageUploadClick}
        setUploading={setUploading}
      /> */}
    </>
  )
}

export default CoverImage
