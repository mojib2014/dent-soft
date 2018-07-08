import React from "react";
import "./Findinfo.css";
import { Row, Col } from "reactstrap";

class FindInfo extends React.Component {
    state = {
        note: this.props.userNote
        // note: ["1", "2", "3"]
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col className="pic-col">
                        <img src={this.props.userImage} alt="User" />
                    </Col>
                    <Col>
                        <div className="basicInfo">
                            <p>Name: {this.props.userName}</p>
                            <p>Phone: {this.props.userPhone}</p>
                            <p>Email: {this.props.userEmail}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="editInfo">
                        <div className="recordInfo"><h3>Record: {this.props.userRecord}</h3></div>
                        <div className="noteInfo">
                            <h3>Note:
                            <div className="note">
                                {/* {this.state.note.map(function(item, i){
                                return <p key={i}>{item}</p>
                                })} */}
                            </div>
                            </h3>
                        </div>
                    </div>
                </Row>

            </div>
        )
    }
}

export default FindInfo;