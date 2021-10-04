const keys = require('./keys');
const jwt = require('jsonwebtoken');
module.exports = login = (request, res, next)=> {
    jwt.verify(request.cookies.cookieToken, keys.secretOrKeys, function (err, decoded) {
      if (err) {
        res.redirect("/")
      } else {
    
        request.cookies.cookieToken = decoded.id;
        id = decoded.id
        
      }
    })
    request.userId = id;
    next()
  }