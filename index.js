const jwt = require('jsonwebtoken');
const TokenError = require('./errors/token_error')

exports.permitRole = function(...allowed) {
 return (req,res,next) => {
   const secretKey = process.env.JWT_KEY || ''
   const isAllowed = role => allowed.indexOf(role) > -1
   const token = req.headers.authorization ? req.headers.authorization.split("bearer ")[1] : undefined || req.query.access_token || req.body.access_token;
   jwt.verify(token, secretKey, (err, decoded) => {
       if(err) {
         next(new TokenError())
       } else {
         var allow = decoded.data.roles ? Object.keys(decoded.data.roles).find((key) => isAllowed(key)) : undefined
         if (allow || allowed === undefined || allowed.length == 0) {
           req.user = decoded.data
           next();
         } else {
           next(new TokenError('Forbidden'))
         }
       }
    })
   }
 }

 exports.permitAction = function(...allowed) {
  return (req,res,next) => {
    const secretKey = process.env.JWT_KEY || ''
    const isAllowed = action => allowed.indexOf(action) > -1
    const token = req.headers.authorization ? req.headers.authorization.split("bearer ")[1] : undefined || req.query.access_token || req.body.access_token;
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
          next(new TokenError())
        } else {
          var allow = decoded.data.roles ? Object.entries(decoded.data.roles).find(e => {
            return e[1].find((act) => isAllowed(act)) !== undefined
          }) : undefined

          if (allow || allowed === undefined || allowed.length == 0)  {
            req.user = decoded.data
            next();
          } else {
            next(new TokenError('Forbidden'))
          }
        }
     })
    }
  }
