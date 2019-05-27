export const updateTextInput = (setState, prevState, target) => {
   setState({
      ...prevState,
      [target.name]: target.value
   });
};

export const updateCheckboxInput = (setState, prevState, propertyName) => {
   setState({
      ...prevState,
      [propertyName]: !prevState[propertyName]
   });
};