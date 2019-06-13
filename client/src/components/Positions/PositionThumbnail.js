import React from "react";
import {Link} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";

const PositionThumbnail = props => (
   <Link to={`/positions/${props.id}`}>
      <Paper style={{margin: "5vh 0 0", padding: "3vh 3vw"}}>
         <Typography variant="h5" component="h3">
            {props.name}
         </Typography>
         <Typography component="div">
            <div>
               {`Salary: ${props.minimumSalary}$ - ${props.maximumSalary}$`}
            </div>
            <div>
               {`Is position available: ${props.state}`}
            </div>
         </Typography>
      </Paper>
   </Link>
);

export default PositionThumbnail;