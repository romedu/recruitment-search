import React from "react";
import CandidateThumbnail from "./CandidateThumbnail";

const CandidatesList = ({candidates, positionId}) => {
   const candidatesThumbnails = candidates.map(candidate => <CandidateThumbnail key={candidate._id}
                                                                                id={candidate._id}
                                                                                positionId={positionId}
                                                                                aspiringSalary={candidate.aspiringSalary}
                                                                                recommendedBy={candidate.recommendedBy} />);
   
   return (
      <ul>
         {candidatesThumbnails}
      </ul>
   )
}

export default CandidatesList;