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
            .max(15)
            .required(),

        // Linda will check pattern again
        // C1 : validation with https://www.npmjs.com/package/joi-password-complexity
        // password: complpassword,
        
        //C2: 
        // password: Joi.string()
        //     .min(6)
        //     .required(),
    
        // repeat_password: Joi.ref('password'),
    
        phone: Joi.number()
            .min(9)
    });
    return schemaRegister.validate(data);
};

//validate for login chatapp
const loginValidate = function(data){
    const schemaLogin = Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        //password:

        // C1 : validation with https://www.npmjs.com/package/joi-password-complexity
        // password: complpassword,
        
        //C2: 
        // password: Joi.string()
        //     .min(6)
        //     .required(),
    });
    return schemaLogin.validate(data)
}

module.exports.regisValidate = regisValidate;
module.exports.loginValidate = loginValidate;

