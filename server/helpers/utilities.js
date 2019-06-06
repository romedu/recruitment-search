exports.createQueryObj = queryParam => {
    const queryObj = {};
    for(let property in queryParam){
        queryObj[property] = {
            $regex: '.*' + queryParam[property] + '.*',
            $options: 'i'
        }
    }
    
    return queryObj;
}

module.exports = exports;