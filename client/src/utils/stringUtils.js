export const buildUrl = (data, urlResources, urlResourcesIds) => {
   let builtUrl = [""];
   urlResources.forEach((urlFraction, index) => {
      builtUrl.push(urlFraction);
      if(urlResourcesIds[index]){
         const currentUrlParam = urlResourcesIds[index];
         let paramValue;
         if(Array.isArray(currentUrlParam)){
            paramValue = currentUrlParam.reduce((acc, nextVal) => acc[nextVal], data);
         }
         else paramValue = data[currentUrlParam];
         builtUrl.push(paramValue);
      }
   })
   return builtUrl.join("/");
}

export const fromCamelToKebabCase = stringToConvert => {
   return stringToConvert.split("")
                         .map(character => {
                            let lowerCasedCharacter = character.toLowerCase();
                            return character !== lowerCasedCharacter ? `-${lowerCasedCharacter}` : character;
                         })
                         .join("");
}

export const capitalizeString = stringToCapitalize => {
   return stringToCapitalize.split("")
                            .map((character, index) => index ? character : character.toUpperCase())
                            .join("")
}