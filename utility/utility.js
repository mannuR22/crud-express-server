
isKeyExistWithType = (key, type, body) => {

    if(!key in body || typeof(body[key]) != type) return false;

    return true;
}

module.exports = {
    isKeyExistWithType
}