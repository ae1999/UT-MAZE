const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.sID = !isEmpty(data.sID) ? data.sID : '';
    data.field = !isEmpty(data.field) ? data.field : '';

    if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = '3 - 30 CHARACTERS';
    }

    if (Validator.isEmpty(data.name)) {
      errors.name = 'NECESSARY';
    }

    if (!Validator.isEmail(data.email) ) {
        errors.email = 'UNCORRECT';
    }

    if (Validator.isEmpty(data.email) ) {
        errors.email = 'NECESSARY';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
        errors.password = '6 - 50 CHARACTERS';
    }

    if (Validator.isEmpty(data.password) ) {
        errors.password = 'NECESSARY';
    }

    if (Validator.isEmpty(data.password2) ) {
        errors.password2 = 'NECESSARY';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'UNMATCHED';
    }

    if (!Validator.isLength(data.sID, { min: 9, max: 9 })) {
        errors.sID = '9 CHARACTERS';
    }

    if (Validator.isEmpty(data.sID) ) {
        errors.sID = 'NECESSARY';
    }

    if (Validator.isEmpty(data.field) ) {
        errors.field = 'NECESSARY';
    }

    if( !(data.field == 'E' || data.field == 'C' ) )
        errors.field = 'E || C'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}