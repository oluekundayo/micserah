const usersSQLSchema = require("../database-schema");
const {encryptPWD,comparePWD} = require('../helpers/password');
const UserService = require("../services/dataGetterService");
const InsertService = require("../services/dataInsertService");
const loginService = require("../services/loginService");
const jwt = require('jsonwebtoken');
const config = require('../config');
const EmailService = require("../services/emailService");
const UpdateService = require("../services/dataUpdateService");
const _ = require('lodash');

const createUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    sex,
    phone_no,
    interest,
  } = req.body;
  
  const getUser = new UserService();
  const insertService = new InsertService();
  const updateUser = new UpdateService();

  const verifier = require("email-verify");
  const { isDevelopment } = require("../config");
  const { badJson, goodJson, nameValid } = require("../helpers");

  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);

  if (!email) return badJsonWithRes("Email is required");
  if (email.length > 250)
    return badJsonWithRes("Email should not be more than 250 characters long");
  // verifier.verify(email, function (err, resp) {
    // if (err) return badJsonWithRes("Unable to verify if your email is working");
    // if (!resp.success) return badJsonWithRes("Email is not accessible");

    let nameErr;
    if ((nameErr = nameValid(firstname, "First Name")) !== true)
      return badJsonWithRes(nameErr);
    if ((nameErr = nameValid(lastname, "Last Name")) !== true)
      return badJsonWithRes(nameErr);
    if (!password) return badJsonWithRes("Password is required");
    else if (password.length < 4)
      return badJsonWithRes("Password must be at least 4 characters long");
    else if ([firstname, lastname, email].includes(password))
      return badJsonWithRes(
        "Password must not be any of your first name, other name, last name or email"
      );
    if (sex && sex !== "male" && sex !== "female")
      return badJsonWithRes("Sex must be one of male or female");
    if (
      phone_no &&
      !/^(\+234|0)\s?-?\s?\d{3}\s?-?\s?\d{3}\s?-?\s?\d{4}$/.test(phone_no)
    )
      return badJsonWithRes("Phone number is invalid");


    let userData = await getUser.findUserByEmail(email);

    if (userData.length > 0) {
        return badJsonWithRes(
            "This email address has already been registered", 
            400
        );
    } else {
        
          const insertObj = {
            firstname,
            lastname,
            email,
            password: encryptPWD(req.body.password),
            sex,
            phone_no,
            // city, 
          };
          let insertUserData = await insertService.InsertIntoUser(insertObj);
          if (insertUserData){
            const userID = insertUserData.insertId;
            console.log(userID)
            const insertObj2 = {
              user_id: userID,
            };
            let insertUserData2 = await insertService.InsertIntoInterest(insertObj2);
          
            if (insertUserData2) {
              for (let i = 0; i < interest.length; i++) {
                const insertObj = {
                  interest: interest[i]
                };
                let sendUpdate = await updateUser.updateInterestById(userID, insertObj);  
                              
              }
              goodJsonWithRes({ 
                messsage: "User created!!"
              }, 201);
            }
          }
        else badJsonWithRes("Unable to create user's account");
    }
};

const loginUser = async (req, res, next) => {
    const badJsonWithRes = (err, code) => badJson(res, err, code);
    const goodJsonWithRes = (data, code) => goodJson(res, data, code);
    const getUser = new UserService();
    //   const loginservice = new loginService();
    const {
        user_id,
        email,
        password
    } = req.body;
    
    let checkLogin = (async(userid, email, password) => {
        if (email) {
            let emailData = await getUser.findUserByEmail(email);
            if (!emailData) {
                return badJsonWithRes(`Errors, This user email "${email}" doesn't exist`);
            }
            if (emailData) {
              // console.log(emailData[0].password)
                let match = await loginService.comparePassword(password, emailData);
                if (match === true) {
                    let data = jwt.sign({userid: emailData[0].user_id}, config.secretkey,{expiresIn: "1d"}); //,{expiresIn: 2600}
                    return res.json({
                        success: true,
                        token: data,
                        user_role: emailData[0].user_role,    
                        message: 'Successful Login!!'
                      });
                }
            } else {
                return badJsonWithRes(`Incorrect Data Check your Email and Password`);
            }
            return
        }else if (userid) {
          // console.log(userid)
            let emailData = await getUser.findUserById(userid);
            if (!emailData) {
                return badJsonWithRes(`Errors, This userid "${userid}" doesn't exist`);
            }
            if (emailData) {
                let match = await loginService.comparePassword(password, emailData);
                if (match = true) {
                    let data = jwt.sign({userid: emailData[0].user_id}, config.secretkey,{expiresIn: "1d"}); //
                    return res.json({
                        success: true,
                        token: data,
                        user_role: emailData[0].user_role,
                        message: 'Successful Login!!'
                      });
                }
            } else {
                return badJsonWithRes(`Incorrect Data Check your UserId and Password`);
            }
            return
        }
    })

    checkLogin(user_id, email, password);
}

const getUserDetails = async (req, res, next) => {
  const { badJson, goodJson, nameValid } = require("../helpers");
  const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const getUser = new UserService();
  //   const loginservice = new loginService();
  const {
      id
  } = req.query;

  let userData = await getUser.findUserById(id);
  if (userData.length < 1) {
    badJsonWithRes(`Sorry, No Data Found.`)
    return;
  }

  userData = _.omit(userData[0], ['password']);
  // console.log(newUserData)

  goodJsonWithRes(userData, 201);
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    getUserDetails: getUserDetails
};