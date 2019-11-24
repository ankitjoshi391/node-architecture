// const questionDBAPI = require("../db_apis/questionDB.js");

async function getCtrl(req, res, next) {
  try {
    const responseObj = {
      message: "Hi, Your App is up."
    };
    res.status(200).json(responseObj);
  } catch (err) {
    next(err);
  }
}

module.exports.getCtrl = getCtrl;
