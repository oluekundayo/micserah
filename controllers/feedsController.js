const GetterService = require("../services/dataGetterService");
const InsertService = require("../services/dataInsertService");
const UpdateService = require("../services/dataUpdateService");
const DeleteService = require("../services/dataDeleteService");

const getFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const {
    user_id,
  } = req.query;
  const getterService = new GetterService();
  
  if (user_id) {
  let getData = await getterService.findFeedById(user_id);
    if (getData) {
      return goodJsonWithRes(getData, 201);
    }else {
      goodJsonWithRes({ messsage: `${title} Feed Not Found` }, 201);
    }
  }else {
    let getData = await getterService.findAllFeeds();
    if (getData) {
      return goodJsonWithRes(getData, 201);
    }else {
      goodJsonWithRes({ messsage: `${feature} Feed Not Found` }, 201);
    }
  }

  
};

const createFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const {
    user_id,
    title,
    description,
  } = req.body;
  const insertService = new InsertService();

  const insertObj = {
    user_id,
    title,
    description,
  };
  let insertUserData = await insertService.InsertIntoFeeds(insertObj);
  if (insertUserData)
    goodJsonWithRes({ messsage: `${title} Feed created!!` }, 201);
  else badJsonWithRes("Unable to create the Feed account");
};

const updateFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const {
    title,
    description,
  } = req.body;
  const updateUser = new UpdateService();

  const insertObj = {};

  try {
    for (let x in req.body) {
      val = req.body[x];
      insertObj[x] = val;
    }
  } catch (err) {
    return badJsonWithRes("Bad Request");
  }

  let sendUpdate = await updateUser.updateFeedById(id, insertObj);
  if (sendUpdate)
    goodJsonWithRes({ messsage: `This Feed is successfully updated` }, 201);
  else badJsonWithRes("Unable to update this Feed account");
};

const deleteFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const deleteUser = new DeleteService();

  let sendUpdate = await deleteUser.deleteFeedById(id);
  if (sendUpdate)
    goodJsonWithRes({ messsage: `This book is successfully Delete` }, 201);
  else badJsonWithRes("Unable to Delete this book account");
};

module.exports = {
  getFeed:getFeed,
  createFeed: createFeed,
  updateFeed: updateFeed,
  deleteFeed: deleteFeed
};
