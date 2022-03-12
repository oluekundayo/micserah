const GetterService = require("../services/dataGetterService");
const InsertService = require("../services/dataInsertService");
const UpdateService = require("../services/dataUpdateService");
const DeleteService = require("../services/dataDeleteService");

const getFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const {
    title,
    author,
    course,
    feature,
  } = req.query;
  const getterService = new GetterService();
  
  if (feature && title) {
  let getData = await getterService.findFeedByTitle(title);
    if (getData) {
      return goodJsonWithRes(getData, 201);
    }else {
      goodJsonWithRes({ messsage: `${title} Feed Not Found` }, 201);
    }
  }if (feature && author) {
    let getData = await getterService.findFeedByAuthor(author);
      if (getData) {
        return goodJsonWithRes(getData, 201);
      }else {
        return goodJsonWithRes({ messsage: `${feature} Feed Not Found` }, 201);
      }
    }if (feature && course) {
      let getData = await getterService.findFeedByCourse(course);
        if (getData) {
          return goodJsonWithRes(getData, 201);
        }else {
          return goodJsonWithRes({ messsage: `${feature} Feed Not Found` }, 201);
        }
      }else {
      let getData = await getterService.findAllFeed();
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
    title,
    author,
    course,
    description,
    book_type,
    file,
    file_type,
    file_size,
    cover,
  } = req.body;
  const insertService = new InsertService();

  const insertObj = {
    title,
    author,
    course,
    description,
    book_type,
    file,
    file_type,
    file_size,
    cover,
  };
  let insertUserData = await insertService.InsertIntoBooks(insertObj);
  if (insertUserData)
    goodJsonWithRes({ messsage: `${title} Book created!!` }, 201);
  else badJsonWithRes("Unable to create the book account");
};

const updateFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const {
    title,
    author,
    course,
    description,
    file,
    file_type,
    file_size,
    cover,
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

  let sendUpdate = await updateUser.updateBookById(id, insertObj);
  if (sendUpdate)
    goodJsonWithRes({ messsage: `This book is successfully updated` }, 201);
  else badJsonWithRes("Unable to update this book account");
};

const deleteFeed = async (req, res, next) => {
  const { badJson, goodJson } = require("../helpers");
  
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const { id } = req.params;
  const deleteUser = new DeleteService();

  let sendUpdate = await deleteUser.deleteBookById(id);
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
