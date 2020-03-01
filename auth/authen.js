const Joi = require('@hapi/joi');
//Validate account will be registered with Joi

const regisValidate = function(data){
    const schemaRegister = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),    
        
        name: Joi.string()
            .min(4)
            .max(15)
            .required(),
    
        password: [
            Joi.string()
                .min(3),
            Joi.number()
                .min(3)
        ],
            // .required(),
            // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), //Linda will check pattern again
    
        confirmpass: Joi.ref('password'),
    
        phone: Joi.number()
            .min(9)
    });
    return schemaRegister.validate(data);
};

module.exports.regisValidate = regisValidate;


