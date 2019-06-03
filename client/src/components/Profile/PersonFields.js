import React, {useState, Fragment} from "react";
import ToggleableField from "../UI/ToggleableField";

const PersonFields = props => {
    const [fieldsState, setFieldsState] = useState({
        displayCompetences: false,
        displayLanguages: false,
        displayTrainings: false,
        displayExperiences: false,
        displayApplications: false
    })
    
    const displayFieldToggler = fieldName => {
        setFieldsState({
            ...fieldsState,
            [fieldName]: !fieldsState[fieldName]
        })
    }
    
    return (
        <Fragment>
            <ToggleableField fieldData={props.competences} 
                             identifiers={["description"]}
                             creationUrl="/my-profile/competences/create" 
                             isDisplayed={fieldsState.displayCompetences} 
                             toggleHandler={() => displayFieldToggler("displayCompetences")} 
            >
                Competences
            </ToggleableField>
            <ToggleableField fieldData={props.languages} 
                             identifiers={["name"]}
                             creationUrl="/my-profile/languages/create" 
                             isDisplayed={fieldsState.displayLanguages} 
                             toggleHandler={() => displayFieldToggler("displayLanguages")} 
            >
                Languages
            </ToggleableField>
            <ToggleableField fieldData={props.trainings} 
                             identifiers={["name"]} 
                             isDisplayed={fieldsState.displayTrainings} 
                             toggleHandler={() => displayFieldToggler("displayTrainings")} 
            >
                Trainings
            </ToggleableField>
            <ToggleableField fieldData={props.workingExperiences} 
                             identifiers={["name"]} 
                             isDisplayed={fieldsState.displayExperiences} 
                             toggleHandler={() => displayFieldToggler("displayExperiences")} 
            >
                Working Experiences
            </ToggleableField>
            <ToggleableField urlResources={["positions", "candidates"]}
                             urlResourcesIds={[["position", "_id"], "_id"]}
                             fieldData={props.applications} 
                             identifiers={["position", "name"]} 
                             isDisplayed={fieldsState.displayApplications} 
                             toggleHandler={() => displayFieldToggler("displayApplications")} 
            >
                Applications
            </ToggleableField>
        </Fragment>
    )
}

export default PersonFields;