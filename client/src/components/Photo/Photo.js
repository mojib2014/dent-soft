import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Photo.css';
import API from "../../utils/API";

const CLOUDINARY_UPLOAD_PRESET = 'j0thsnot';
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/putincake/image/upload";

class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: "",
      loginId:'',
      notice: "Profile Image",
      callBackImageLink: ''
    };
  }

  componentDidMount() {
    let cookieId = this.readCookie("loggedinId")
    this.setState({
        loginId: cookieId,
    })
  }

  readCookie = a => {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      notice: "Uploading... process might take a minute"
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        
          if (response.body.secure_url !== '') {
           
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url,
            });
            
            let newPhoto = {
              id: this.state.loginId, url: this.state.uploadedFileCloudinaryUrl
            }
            API.createPhoto(newPhoto)
            .then((result) => {
              console.log(result);
              if (result.data) {
                this.setState({
                  notice: "image upload success"
                })
              } else {
                this.setState({
                  notice: "image upload failed, please try again with an image with smaller file size.."
                })
              }
              this.setState({callBackImageLink: result});

            })
          }
        })
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? (
                <div>
                  <img src={this.props.DimageUrl} alt="click me to add"/>
                  <div>{this.state.notice}</div>
                </div>
              ) :
                <div>
                  <img src={this.state.uploadedFileCloudinaryUrl} alt="click me to add"/>
                  <div>{this.state.notice}</div>
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

export default Photo;