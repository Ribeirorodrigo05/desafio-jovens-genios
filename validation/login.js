const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogininput(data){
    let errors = {};

    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
     
    if (Validator.isEmpty(data.email)) {
        errors.email = 'campo obrigatório';
      }

      if (!Validator.isEmail(data.email)) {
        errors.email = 'Email inválido';
      }

      if (Validator.isEmpty(data.password)) {
        errors.password = 'campo obrigatório';
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
};