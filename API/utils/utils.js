function isErrorAForeignKeyViolation(error) {
    return error.includes("foreign") && error.includes("key") && error.includes("violates");
}

module.exports = {isErrorAForeignKeyViolation}