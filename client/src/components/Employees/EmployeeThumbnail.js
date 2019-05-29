import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/user-context";

const EmployeeThumbnail = props => {
   const userContext = useContext(UserContext);
   
   return (
      <Link to={`/users/${userContext.id}/employees/${props.id}`}>
         <li style={{border: "1px solid black"}}>
            <h4>
               {props.position}
            </h4>
            <div>
               {`Monthly salary: ${props.monthlySalary}$`}
            </div>
            <div>
               {`Is employee available: ${props.state}`}
            </div>
         </li>
      </Link>
   );
}

export default EmployeeThumbnail;