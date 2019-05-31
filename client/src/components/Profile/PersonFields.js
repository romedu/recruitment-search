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
                             identifier="description" 
                             isDisplayed={fieldsState.displayCompetences} 
                             toggleHandler={() => displayFieldToggler("displayCompetences")} 
            >
                Competences
            </ToggleableField>
            <ToggleableField fieldData={props.languages} 
                             identifier="name" 
                             isDisplayed={fieldsState.displayLanguages} 
                             toggleHandler={() => displayFieldToggler("displayLanguages")} 
            >
                Languages
            </ToggleableField>
            <ToggleableField fieldData={props.trainings} 
                             identifier="name" 
                             isDisplayed={fieldsState.displayTrainings} 
                             toggleHandler={() => displayFieldToggler("displayTrainings")} 
            >
                Trainings
            </ToggleableField>
            <ToggleableField fieldData={props.workingExperiences} 
                             identifier="name" 
                             isDisplayed={fieldsState.displayExperiences} 
                             toggleHandler={() => displayFieldToggler("displayExperiences")} 
            >
                Working Experiences
            </ToggleableField>
            <ToggleableField fieldData={props.applications} 
                             identifier="name" 
                             isDisplayed={fieldsState.displayApplications} 
                             toggleHandler={() => displayFieldToggler("displayApplications")} 
            >
                Applications
            </ToggleableField>
        </Fragment>
    )
}

export default PersonFields;