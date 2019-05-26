import React from "react";
import {Link} from "react-router-dom";
import Button from "../UI/Button";

const LandingPage = () => (
   <div>
      <Link to="/positions">
         <Button>
            Enter
         </Button>
      </Link>
   </div>
);

export default LandingPage;