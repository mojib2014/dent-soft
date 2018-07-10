import React from "react";
import "./Upload.css";
import {FormBtn} from "../../components/Form/FormBtn"

class Upload extends React.Component {

  render() {
    return (
        <FormBtn 
          disabled={!this.props.patientId}
          onClick={this.props.fileUpload}
        >
        Upload Patient Record
        </FormBtn>
    )
  }
}

export default Upload;