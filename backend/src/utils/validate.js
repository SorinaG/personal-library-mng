const {validate} = require('express-validation')

const myValidate = (schema) => {
    return validate(schema, {}, { abortEarly: false })
}

module.exports = myValidate