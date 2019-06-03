import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import UserProperyCreator from "./UserPropertyCreator";

const ProfileRoutes = props => (
   <Fragment>
      <Route path="/my-profile" component={ProfilePage} />
      <Route path="/my-profile/:resourceName/create" component={UserProperyCreator} />
   </Fragment>
)

export default ProfileRoutes;