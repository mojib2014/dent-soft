import React from "react";
import "./Findinfo.css";
import { Row, Col } from "reactstrap";

class FindInfo extends React.Component {

    render() {
        return (
            <div className="container">
                <Row className="emailSearchInfo">
                    <Col className="pic-col">
                        {this.props.userImage ? (
                            <img src={this.props.userImage} style={{height: 200, width: 200}} alt="User" />
                        ) : (
                            <h5>No profile image Available</h5>
                        )}
                    </Col>
                    <Col>
                        <div className="basicInfo">
                            <h4 className="text-left">Name: <strong>{this.props.userName}</strong></h4>
                            <h4 className="text-left">Phone: <strong>{this.props.userPhone}</strong></h4>
                            <h4 className="text-left">Email: <strong>{this.props.userEmail}</strong></h4>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default FindInfo;