export const checkIfEmptyInputs = propsObj => {
    for(let property in propsObj){
        let currentProperty = propsObj[property];
        if(typeof(currentProperty) === "string"){
            if(!currentProperty.trim()) return true;
        }
        else if(!currentProperty) return true;
    }
    return false;
}