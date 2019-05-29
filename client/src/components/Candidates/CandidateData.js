import React from "react";
import FieldData from "../UI/FieldData";

const CandidateData = ({candidate}) => (
    <div>
        <FieldData title="Candidate Name" description={candidate.userData.name} />
        <FieldData title="Candidate National ID" description={candidate.userData.nationalId} />
        <FieldData title="Aspiring Salary" description={`${candidate.aspiringSalary}$`} />
        <FieldData title="Department" description={candidate.department} />
        <FieldData title="Recommended By" description={candidate.recommendedBy} />
    </div>
);

export default CandidateData;