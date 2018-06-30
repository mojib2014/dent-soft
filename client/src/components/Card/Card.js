import React from "react";

const Card = (props) => {
    <div className="card" style="width: 18rem;">
        <div className="card-body">
            {props.children}
        </div>
    </div>
}

export default Card;