// const questionnaireDBAPI = require('../db_apis/questionnaireDB.js');

// async function getQuestionnaire(req, res, next){
//   try {
//     const context = {};

//     context.id = parseInt(req.params.id, 10);
//     // context.sort = req.query.sort;

//     const questionnaire = await questionnaireDBAPI.find(context);
//     const rows = await questionnaireDBAPI.findQuestions(questionnaire);
//     console.log("final Result"+rows)
//     if (req.params.id) {
//       if (rows.length === 1) {
//         res.status(200).json(rows[0]);
//       } else {
//         res.status(404).end();
//       }
//     } else {
//       res.status(200).json(rows);
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// function getCampaignFromReq(req) {
//   const campaign = {
//     campaign_name: req.body.campaign_name,
//     questions: req.body.questions
//   };

//   return campaign;
// }

// async function createQuestionnaire(req, res, next) {
//   try {
//     let campaign = getCampaignFromReq(req);

//     campaign = await questionnaireDBAPI.create(campaign);

//     res.status(201).json(campaign);
//   } catch (err) {
//     next(err);
//   }
// }

// async function updateQuestionnaire(req, res, next) {
//   try {
//     let campaign = getCampaignFromReq(req);

//     campaign.campaign_id = parseInt(req.params.id, 10);

//     campaign = await questionnaireDBAPI.update(campaign);

//     if (campaign !== null) {
//       res.status(200).json(campaign);
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// async function deleteQuestionnaire(req, res, next) {
//   try {
//     const id = parseInt(req.params.id, 10);

//     const success = await questionnaireDBAPI.delete(id);

//     if (success) {
//       res.status(204).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// function getResponseFromReq(req) {
//   let responses = req.body.responses;
//   var questionniare_response = [];
//   for(i = 0; i < responses.length; i++) {
//     const que_res_obj = {
//       campaign_id: req.body.campaignId,
//       question: responses[i].question,
//       response: responses[i].response,
//     };
//     questionniare_response.push(que_res_obj);
//   }

//   return questionniare_response;
// }

// function getUserFromReq(req) {
//   const user = {
//     campaign_id: req.body.campaignId,
// 	  fullname: req.body.user.fullName,
// 	  email: req.body.user.email,
//     phone: req.body.user.phone,
//   };

//   return user;
// }

// //need to update later
// async function submitQuestionnaire(req, res, next) {
//   try {
//     let questionniare_response = getResponseFromReq(req);
//     let user = getUserFromReq(req);

//     questionniare_response = await questionnaireDBAPI.submitQuestionnaire(questionniare_response,user);

//     res.status(201).json(questionniare_response);
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports.getQuestionnaire = getQuestionnaire;
// module.exports.createQuestionnaire = createQuestionnaire;
// module.exports.updateQuestionnaire = updateQuestionnaire;
// module.exports.deleteQuestionnaire = deleteQuestionnaire;
// module.exports.submitQuestionnaire = submitQuestionnaire;
