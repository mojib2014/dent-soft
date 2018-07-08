import React from "react";
import "./Findinfo.css";
import { Row, Col } from "reactstrap";

class FindInfo extends React.Component {

    render() {
        return (
            <div className="container">
                <Row>
                    <Col className="pic-col">
                        {this.props.userImage ? (
                            <img src={this.props.userImage} style={{height: 200, width: 200}} alt="User" />
                        ) : (
                            <h5>No progile image Available</h5>
                        )}
                    </Col>
                    <Col>
                        <div className="basicInfo">
                            <h4 className="text-left">Name: {this.props.userName}</h4>
                            <h4 className="text-left">Phone: {this.props.userPhone}</h4>
                            <h4 className="text-left">Email: {this.props.userEmail}</h4>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default FindInfo;