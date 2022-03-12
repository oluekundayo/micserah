const GetterService = require("../services/dataGetterService");
const InsertService = require("../services/dataInsertService");
const UpdateService = require("../services/dataUpdateService");
const DeleteService = require("../services/dataDeleteService");

const getInterest = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const {
    id,
  } = req.query;
  const getterService = new GetterService();
  
  let getData = await getterService.findBookByTitle(title);
    if (getData) {
      return goodJsonWithRes(getData, 201);
    }else {
      goodJsonWithRes({ messsage: `${title} Book Not Found` }, 201);
    }

  
};

const createInterest = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const {
    interest,
  } = req.body;
  const insertService = new InsertService();

  const insertObj = {
    interest,
  };
  let insertUserData = await insertService.InsertIntoInterest(insertObj);
  if (insertUserData)
    goodJsonWithRes({ messsage: `Interest created!!` }, 201);
  else badJsonWithRes("Unable to create the Interest account");
};

const updateInterest = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const {
    interest,
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

  let sendUpdate = await updateUser.updateInterestById(id, insertObj);
  if (sendUpdate)
    goodJsonWithRes({ messsage: `This book is successfully updated` }, 201);
  else badJsonWithRes("Unable to update this book account");
};

const deleteInterest = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const deleteUser = new DeleteService();

  let sendUpdate = await deleteUser.deleteInterestById(id);
  if (sendUpdate)
    goodJsonWithRes({ messsage: `This book is successfully Delete` }, 201);
  else badJsonWithRes("Unable to Delete this book account");
};

module.exports = {
    getInterest:getInterest,
  createInterest: createInterest,
  updateInterest: updateInterest,
  deleteInterest: deleteInterest
};
