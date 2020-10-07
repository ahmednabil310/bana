import React from 'react';
import ImageUpload from '../common/ImageUpload/ImageUpload';

const HomePage = () => {

    const onImageUploadClick = (newImage) => {
        console.log(newImage);
    }

    return (
        <div>
            <p>Home Page</p>


            <div className="img-upload">
                <div className="img-upload-wrapper">
                    {/* <img className="mx-auto" src={image} alt="HH" /> */}
                    <ImageUpload onImageUploadClick={onImageUploadClick} alertContainer="oc-alert-container" />
                </div>
                {/* For Alert box*/}
                <div id="oc-alert-container"></div>
            </div>

        </div>
    )
}

export default HomePage