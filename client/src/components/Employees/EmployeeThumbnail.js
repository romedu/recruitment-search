import React from "react";
import {Link} from "react-router-dom";

const EmployeeThumbnail = props => (
   <Link to={`/my-employees/${props.id}`}>
      <li style={{border: "1px solid black"}}>
         <h4>
            {props.position}
         </h4>
         <div>
            {`Monthly salary: ${props.monthlySalary}$`}
         </div>
         <div>
            {`Is employee active: ${props.state}`}
         </div>
      </li>
   </Link>
);

export default EmployeeThumbnail;