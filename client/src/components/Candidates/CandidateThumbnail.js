import React from "react";
import {Link} from "react-router-dom";

const CandidateThumbnail = props => (
  <Link to={`/positions/${props.positionId}/candidates/${props.id}`}>
     <li style={{border: "1px solid black"}}>
        <h4>
           Aspiring Salary: {props.aspiringSalary}
        </h4>
        <h4>
           Recommended By: {props.recommendedBy}
        </h4>
     </li>
  </Link>
);

export default CandidateThumbnail;