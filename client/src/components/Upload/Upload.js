import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Upload.css';

const CLOUDINARY_UPLOAD_PRESET = 'j0thsnot';
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/putincake/File/upload";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onFileDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleFileUpload(files[0]);
  }

  handleFileUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onFileDrop.bind(this)}
            multiple={false}
            accept="File/*">
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                  <img src={this.state.uploadedFileCloudinaryUrl} />
                </div>}
            </div>
          </Dropzone>
        </div>

        {/* <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div> */}
      </form>
    )
  }
}

export default Upload;