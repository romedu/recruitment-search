import React from "react";
import CandidateThumbnail from "./CandidateThumbnail";

const CandidatesList = ({candidates, positionId}) => {
   const candidatesThumbnails = candidates.map(candidate => <CandidateThumbnail key={candidate._id}
                                                                                id={candidate._id}
                                                                                positionId={positionId}
                                                                                aspiringSalary={candidate.aspiringSalary}
                                                                                department={candidate.department}
                                                                                recommendedBy={candidate.recommendedBy} />);
   
   return (
      <ul style={{padding: 0, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
         {candidatesThumbnails}
      </ul>
   )
}

export default CandidatesList;