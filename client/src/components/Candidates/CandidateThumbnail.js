import React from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardActions, Typography, Button} from "@material-ui/core";

const CandidateThumbnail = props => (
   <Card style={{margin: "2vw"}}>
      <CardContent>
         <Typography variant="h5" component="h2">
            Aspiring Salary: {props.aspiringSalary}
         </Typography>
         <Typography variant="body2" component="p">
            Department: {props.department}
         </Typography>
         <Typography variant="body2" component="p">
            Recommended By: {props.recommendedBy}
         </Typography>
      </CardContent>
      <CardActions>
         <Link to={`/positions/${props.positionId}/candidates/${props.id}`}>
            <Button size="small">Learn More</Button>
         </Link>
      </CardActions>
   </Card>
);

export default CandidateThumbnail;