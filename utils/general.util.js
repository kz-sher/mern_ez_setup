const capitalize = string => {
    return string.replace(/\b[a-zA-Z]/g, (match) => match.toUpperCase())
}

module.exports = { capitalize };
