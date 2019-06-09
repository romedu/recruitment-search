import React from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardActions, Typography, Button} from "@material-ui/core";

const EmployeeThumbnail = props => (
   <Card style={{margin: "2vw"}}>
      <CardContent>
         <Typography variant="h5" component="h2">
            {props.position}
         </Typography>
         <Typography variant="body2" component="p">
            {`Monthly salary: ${props.monthlySalary}$`}
         </Typography>
         <Typography variant="body2" component="p">
            {`Is employee active: ${props.state}`}
         </Typography>
      </CardContent>
      <CardActions>
         <Link to={`/my-employees/${props.id}`}>
            <Button size="small">Learn More</Button>
         </Link>
      </CardActions>
   </Card>
);

export default EmployeeThumbnail;