const jwt = require('jsonwebtoken');

module.exports = function permit(...allowed) {
 return (req,res,next) => {
   const secretKey = process.env.JWT_KEY || ''
   const isAllowed = role => allowed.indexOf(role) > -1
   const token = req.headers.authorization.split("bearer ")[1] || req.query.access_token || req.body.access_token;
   jwt.verify(token, secretKey, (err, decoded) => {
       if(err) {
         next({
              message: 'invalid token',
              data:err
            })
       } else {
         var rights = decoded.data.role ? Object.keys(decoded.data.role).reduce((rights,key) => {
           if(isAllowed(key)) {
             rights.push(key);
           }
           return rights;
         },[]) : undefined;

         if (rights && rights.length > 0) {
           next();
         } else {
           next({
             message: 'Forbidden'
           })
         }
       }
    })
   }
 }
