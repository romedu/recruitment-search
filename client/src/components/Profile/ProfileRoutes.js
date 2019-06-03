import React, {Fragment} from "react";
import {Route} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import UserProperyModal from "./UserPropertyModal";

const ProfileRoutes = props => (
   <Fragment>
      <Route path="/my-profile" component={ProfilePage} />
      <Route path="/my-profile/:resourceName/create" component={UserProperyModal} />
   </Fragment>
)

export default ProfileRoutes;