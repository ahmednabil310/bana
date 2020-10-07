import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { Spinner } from 'react-bootstrap';
import "react-image-crop/dist/ReactCrop.css";
import Api from '../../../../apis/Api';

// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function generateDownload(previewCanvas, crop, onCropFinish) {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width * pixelRatio, crop.height * pixelRatio);
  var dataURL = canvas.toDataURL();

  var blobBin = atob(dataURL.split(',')[1]);
  var array = [];
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  var file = new Blob([new Uint8Array(array)], { type: 'image/png' });


  var formdata = new FormData();
  formdata.append("profileImage", file, 'testImage.png');

  Api.post('/img-upload', formdata, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
    }
  })
    .then((response) => {
      if (200 === response.status) {
        // If file size is larger than expected.
        if (response.data.error) {
          if ('LIMIT_FILE_SIZE' === response.data.error.code) {
            console.log('Max size: 1MB')
            // this.ocShowAlert('Max size: 1MB', 'red');
          } else {
            // If not the given file type
            console.log(response.data.error)
            // this.ocShowAlert(response.data.error, 'red');
          }
        } else {
          // Success
          console.log(response.data)
          onCropFinish(response.data.location)
          // this.setState({ image: response.data.location })
          // this.props.onImageUploadClick({ location: response.data.location, file })
          // this.ocShowAlert('File Uploaded', '#3089cf');
        }
      }
    }).catch((error) => {
      console.log(error)
      // If another error
      // this.ocShowAlert(error, 'red');
    });



  // canvas.toBlob(
  //   blob => {
  //     const previewUrl = window.URL.createObjectURL(blob);
  //     console.log('blob', previewUrl)
  //     const anchor = document.createElement("a");
  //     anchor.download = "cropPreview.png";
  //     anchor.href = URL.createObjectURL(blob);
  //     console.log('url', anchor.href)
  //     anchor.click();

  //     window.URL.revokeObjectURL(previewUrl);
  //   },
  //   "image/png",
  //   1
  // );
}

export default function ImageCropper({ aspectRatio, onCropFinish }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: aspectRatio });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [uploading, setUploading] = useState(false)

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={c => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0
          }}
        />
      </div>
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => {
          setUploading(true)
          generateDownload(previewCanvasRef.current, completedCrop, onCropFinish)
        }}
      >
        {uploading ? <Spinner className="mx-auto" animation="border" /> : 'Done'}
      </button>
    </div >
  );
}
