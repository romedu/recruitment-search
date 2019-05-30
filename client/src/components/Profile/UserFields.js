import React, {Fragment} from "react";
import FieldData from "../UI/FieldData";
import InputField from "../UI/InputField";

const UserFields = ({name, nationalId, isCompany}) => (
    <Fragment>
        <FieldData title="Name" description={name} />
        <FieldData title="National ID" description={nationalId} />
        <InputField name="isCompany" type="checkbox" value={isCompany} disabled>
            Are you representing a company?
        </InputField>
    </Fragment>
)

export default UserFields;