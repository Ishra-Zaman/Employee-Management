function isErrorAForeignKeyViolation(error) {
    return error.includes("foreign") && error.includes("key") && error.includes("violates");
}

function displayValidationErrorMessages(errors) {
    return errors?.map((e) => `Field: ${e.path} - Msg: ${e.message}`)
}

module.exports = {isErrorAForeignKeyViolation, displayValidationErrorMessages}