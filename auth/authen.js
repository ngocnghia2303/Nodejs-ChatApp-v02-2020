//body-parser
const bodyParser = require('body-parser');

const Joi = require('@hapi/joi');
const complpassword = require('../routes/index')
//Validate account will be registered with Joi

const regisValidate = function(data){
    const schemaRegister = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),    
        
        name: Joi.string()
            .min(4)
            .max(15),

        // Linda will check pattern again
        // C1 : validation with https://www.npmjs.com/package/joi-password-complexity
        password: Joi.string(),    
        pass_repeat: Joi.ref('password'),

        phone: Joi.string()
            .min(9),
        
        address: Joi.string(),
        
        work: Joi.string(),

        workplace: Joi.string(),

        age: Joi.number()
            .min(20),
        
        favorite: Joi.string(),

        yourself: Joi.string(),

        security: Joi.string(),

        income: Joi.number(),

        alone: Joi.string(),

    }).strict(false);
    return schemaRegister.validate(data);
};

//validate for login chatapp
const loginValidate = function(data){
    const schemaLogin = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        //password:
        password: Joi.string(),
    });
    return schemaLogin.validate(data)
}

module.exports.regisValidate = regisValidate;
module.exports.loginValidate = loginValidate;

