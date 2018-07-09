import React from "react";

const DelBtn = (props) => (

    <span 
        className="delete-btn mr-2" 
        style={{ float: "left", color: "#e74944", cursor: "pointer"}}
        {...props}
    > 
    x  
    </span>
)

export default DelBtn;