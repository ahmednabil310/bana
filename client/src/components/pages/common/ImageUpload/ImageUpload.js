import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import Api from '../../../../apis/Api';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    singleFileChangedHandler = (event) => {
        //check if images already uploaded

        let file;

        let data = new FormData();

        if (event.target.files[0]) {
            file = event.target.files[0].name;

            if (this.props.recipeImages) {
                const existinfImage = this.props.recipeImages.filter(image => image.file === file);
                if (existinfImage.length > 0) return this.ocShowAlert('Already uploaded', '#3089cf');
            }

            this.props.setUploading(true)

            data.append('profileImage', event.target.files[0], event.target.files[0].name);
            Api.post('/img-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {
                        // If file size is larger than expected.
                        if (response.data.error) {
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                this.ocShowAlert('Max size: 1MB', 'red');
                            } else {
                                // If not the given file type
                                this.ocShowAlert(response.data.error, 'red');
                            }
                        } else {
                            // Success
                            this.setState({ image: response.data.location })
                            this.props.onImageUploadClick({ location: response.data.location, file })
                            this.ocShowAlert('File Uploaded', '#3089cf');
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                    // If another error
                    this.ocShowAlert(error, 'red');
                });
        } else {
            // if file not selected throw error
            this.ocShowAlert('Please upload file', 'red');
        }
    };

    // ShowAlert Function
    ocShowAlert = (message, background = '#3089cf') => {
        let errorHandler = this.props.setUploadError;
        errorHandler({ message, background })
        setTimeout(function () {
            errorHandler({})
        }, 3000);
    };

    render() {
        return (
            <div >
                <input type="file" onChange={this.singleFileChangedHandler} ref={fileInput => this.fileInput = fileInput} style={{ display: 'none' }} />
                <div onClick={() => this.fileInput.click()} >
                    {this.props.trigger}
                </div>
            </div>
        );
    }
}

export default ImageUpload;
