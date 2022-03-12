const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");


userRouter.route('/user_details')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( userController.getUserDetails )
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supprted on User')
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});

userRouter.route('/register')
.post( userController.createUser )
.get( (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supprted on User')
})
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supprted on User')
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});

userRouter.route('/login')
.post( userController.loginUser )
.get( (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supprted on User')
})
// .get(sendArtisansInfo, usersReader)
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supprted on User')
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});


module.exports = userRouter;