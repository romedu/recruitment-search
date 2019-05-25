import React from "react";
import {Link} from "react-router-dom";

const PositionThumbnail = props => (
   <Link to={`/positions/${props.id}`}>
      <li style={{border: "1px solid black"}}>
         <h4>
            {props.name}
         </h4>
         <div>
            {`Salary: ${props.minimumSalary}$ - ${props.maximumSalary}$`}
         </div>
         <div>
            {`Is position available: ${props.state}`}
         </div>
      </li>
   </Link>
);

export default PositionThumbnail;