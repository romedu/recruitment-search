import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import UserProperyModal from "./UserPropertyModal";
import NewExpertiseModal from "./NewExpertiseModal";

const ProfileRoutes = props => {
   const dateValidation = { max: new Date().toISOString().split("T")[0]}, // html validation requires the ISO Date format
         trainingProperties = [
            {
               name: "description",
               type: "text"
            },
            {
               name: "level",
               type: "text"
            },
            {
               name: "institution",
               type: "string"
            },
            {
               name: "startingDate",
               type: "date",
               validation: dateValidation
            },
            {
               name: "endingDate",
               type: "date",
               validation: dateValidation
            }
         ], 
         experiencesProperties = [
            {
               name: "companyName",
               type: "text"
            },
            {
               name: "position",
               type: "text"
            },
            {
               name: "salary",
               type: "number",
               validation: { min: 0 }
            },
            {
               name: "startingDate",
               type: "date",
               validation: dateValidation
            },
            {
               name: "endingDate",
               type: "date",
               validation: dateValidation
            }
         ];

   return (
      <Fragment>
         <Route path="/my-profile" component={ProfilePage} />
         <Switch>
            <Route path="/my-profile/trainings/create" render={() => <NewExpertiseModal expertiseName="trainings" properties={trainingProperties} />} />
            <Route path="/my-profile/workingExperiences/create" render={() => <NewExpertiseModal expertiseName="workingExperiences" properties={experiencesProperties} />} />
            <Route path="/my-profile/:resourceName/create" component={UserProperyModal} />
         </Switch>
      </Fragment>
   )
}

export default ProfileRoutes;