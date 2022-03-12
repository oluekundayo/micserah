const express = require("express");
const otherRouter = express.Router();
const feedsController = require("../../controllers/feedsController");
const interestController = require("../../controllers/interestController");



// >>>>>>>>>>>>> Feed Data >>>>>>>>>

otherRouter.route('/feed')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( feedsController.getFeed )
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supprted on User')
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});

otherRouter.route('/feed/create')
.post( feedsController.createFeed )
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

otherRouter.route('/feed/update/:id')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supprted on User')
})
// .get(sendArtisansInfo, usersReader)
.put( feedsController.updateFeed )
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});

otherRouter.route('/feed/delete/:id')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supprted on User')
})
// .get(sendArtisansInfo, usersReader)
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
})
.delete( feedsController.deleteFeed );

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Borrow Data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

otherRouter.route('/interest')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( interestController.getInterest )
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supprted on User')
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supprted on User')
});

otherRouter.route('/interest/:id')
.post( (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supprted on User')
})
.get( (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supprted on User')
})
.put( interestController.updateInterest )
.delete( interestController.deleteInterest );

otherRouter.route('/interest/create/:id')
.post( interestController.createInterest )
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




module.exports = otherRouter;