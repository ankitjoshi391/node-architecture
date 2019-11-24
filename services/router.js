const express = require("express");
const router = new express.Router();
const indexCtrl = require("../controllers/indexCtrl.js");
// const questionnaireCtrl = require('../controllers/questionnaireCtrl.js');
// const questionCtrl = require('../controllers/questionCtrl.js');

// router
//   .route("/questionnaire/:id?")
//   .get(questionnaireCtrl.getQuestionnaire)
//   .post(questionnaireCtrl.createQuestionnaire)
//   .put(questionnaireCtrl.updateQuestionnaire)
//   .delete(questionnaireCtrl.deleteQuestionnaire);

// router
//   .route("/submitQuestionnaire/:id?")
//   .post(questionnaireCtrl.submitQuestionnaire);

// router
//   .route("/question/:id?")
//   .get(questionCtrl.getQuestion)
//   .post(questionCtrl.createQuestion)
//   .put(questionCtrl.updateQuestion)
//   .delete(questionCtrl.deleteQuestion);
router.route("/index").get(indexCtrl.getCtrl);

module.exports = router;
