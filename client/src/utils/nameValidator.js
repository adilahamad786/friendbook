exports.nameValidator = (name) => {
    return ( name.length > 2 && (/^[a-zA-Z]+ [a-zA-Z]+$/.test(name) || /^[a-zA-Z]+$/.test(name)))
}