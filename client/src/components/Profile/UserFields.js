import React, {Fragment} from "react";
import {FormControlLabel, Checkbox} from "@material-ui/core";
import FieldData from "../UI/FieldData";

const UserFields = ({name, nationalId, isCompany}) => (
    <Fragment>
        <FieldData title="Name" description={name} />
        <FieldData title="National ID" description={nationalId} />
        <FormControlLabel
            name="isCompany"
            checked={isCompany}
            control={<Checkbox color="primary" />}
            label="Are you representing a company?"
            labelPlacement="start"
            disabled
         />
    </Fragment>
)

export default UserFields;