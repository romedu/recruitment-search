exports.nationalIdValidator = personalId => {
    let idLength = personalId.length;
    if(idLength < 6 || idLength > 11) return false;
    if(idLength < 11) return true;
    return checkIfNationalId(personalId);
}

const checkIfNationalId = nationalId => {
    if(isNaN(Number(nationalId))) return false;
    
    const processedIdDigits = nationalId.split("")
                                        .map((digit, index) => {
                                            let currentDigit = digit;
                                            if(index % 2) currentDigit *= 2;
                                            if(currentDigit >= 10) currentDigit -= 9;
                                            return currentDigit;
                                        });
    
    const processedDigitsSum = processedIdDigits.reduce((acc, nextVal) => acc + nextVal, 0);                                    
    
    return processedDigitsSum[10] === getVerifierNum(processedDigitsSum);
}

const getVerifierNum = processedDigitsSum => {
    let verifier = processedDigitsSum;
    
    while(verifier % 10 !== 0) verifier++;
    
    verifier -= processedDigitsSum;
    if(verifier === 10) return 0;
    return verifier;
}