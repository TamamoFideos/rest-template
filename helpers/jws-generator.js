const jwt = require('jsonwebtoken');


const generateJWT = ( uid ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.SECRET_OR_PUBLIC_KEY, {
            expiresIn: '6h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject(' Could not validate token');
            }else{
                resolve( token );
            }
        }
        )
    })
}

module.exports = {
    generateJWT
}