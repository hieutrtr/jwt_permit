const jwt = require('jsonwebtoken');
const TokenError = require('./errors/token_error')

module.exports = function permit(...allowed) {
 return (req,res,next) => {
   const secretKey = process.env.JWT_KEY || ''
   const isAllowed = role => allowed.indexOf(role) > -1
   const token = req.headers.authorization.split("bearer ")[1] || req.query.access_token || req.body.access_token;
   jwt.verify(token, secretKey, (err, decoded) => {
       if(err) {
         next(new TokenError())
       } else {
         var rights = decoded.data.roles ? Object.keys(decoded.data.roles).reduce((rights,key) => {
           if(isAllowed(key)) {
             rights.push(key);
           }
           return rights;
         },[]) : undefined;

         if (rights && rights.length > 0) {
           req.user = decoded.data
           next();
         } else {
           next(new TokenError('Forbidden'))
         }
       }
    })
   }
 }
