// const oracledb = require('oracledb');
// const database = require('../services/dbService.js');

// const selectCampaignQuery =
//  `select id "campaign_id",
//     campaign_name "campaign_name",
//     questions "questions"
//   from ddf_campaign
//   where 1 = 1`;

// const sortableColumns = ['id'];

// async function find(context) {
//   let query = selectCampaignQuery;
//   const binds = {};

//   if (context.id) {
//     binds.campaign_id = context.id;

//     query += '\nand id = :campaign_id';
//   }

//   if (context.sort === undefined) {
//     query += '\norder by id asc';
//   } else {
//     let [column, order] = context.sort.split(':');

//     if (!sortableColumns.includes(column)) {
//       throw new Error('Invalid "sort" column');
//     }

//     if (order === undefined) {
//       order = 'asc';
//     }

//     if (order !== 'asc' && order !== 'desc') {
//       throw new Error('Invalid "sort" order');
//     }

//     query += `\norder by "${column}" ${order}`;
//   }

//   const result = await database.simpleExecute(query, binds);

//   return result.rows;
// }

// // const fetchQuestionsQuery =
// //   `select * from DDF_CAMPAIGN_QUESTIONS
// //   where id in (:questionsArray)`;

// async function findQuestions(questionnaire){
//   const binds = {};
//   for(i = 0; i < questionnaire.length; i++) {
//     let quesarray = questionnaire[i].questions.split(',');

//     fetchQuestionsQuery = "select * from DDF_CAMPAIGN_QUESTIONS where id in (";
//     for (var j=0; j < quesarray.length; j++) fetchQuestionsQuery += (j > 0) ? ", '" + quesarray[j] + "'": "'" + quesarray[j]+ "'";
//     fetchQuestionsQuery += ")";
//     const result = await database.simpleExecute(fetchQuestionsQuery, binds);
//     questionnaire[i].questionDetail = result.rows;
//     for (var k=0; k < result.rows.length; k++){
//       let optionsArray=result.rows[k].OPTIONS.split(',');
//       console.log('===>'+optionsArray);
//       questionnaire[i].questionDetail[k]['OPTIONS'] = optionsArray;
//     }
//   }
//   return questionnaire;
// }

// const createSql =
//  `insert into DDF_CAMPAIGN (
//     campaign_name,
//     questions
//   ) values (
//     :campaign_name,
//     :questions
//   ) returning id
//   into :id`;

// async function create(campaign) {
//   const ddf_campaign = Object.assign({}, campaign);

//   ddf_campaign.id = {
//     dir: oracledb.BIND_OUT,
//     type: oracledb.NUMBER
//   }

//   const result = await database.simpleExecute(createSql, ddf_campaign);

//   ddf_campaign.id = result.outBinds.id[0];

//   return ddf_campaign;
// }

// const updateSql =
// `update DDF_CAMPAIGN
//   set campaign_name = :campaign_name,
//   questions = :questions
// where id = :campaign_id`;

// async function update(campaign) {
//   const ddf_campaign = Object.assign({}, campaign);
//   const result = await database.simpleExecute(updateSql, ddf_campaign);

//   if (result.rowsAffected && result.rowsAffected === 1) {
//     return ddf_campaign;
//   } else {
//     return null;
//   }
// }

// const deleteSql =
//  `begin

//     delete from DDF_CAMPAIGN
//     where id = :id;

//     :rowcount := sql%rowcount;

//   end;`

// async function del(campaign_id) {
//   const binds = {
//     id: campaign_id,
//     rowcount: {
//       dir: oracledb.BIND_OUT,
//       type: oracledb.NUMBER
//     }
//   }
//   const result = await database.simpleExecute(deleteSql, binds);

//   return result.outBinds.rowcount === 1;
// }

// const createUserSql =
//  `insert into DDF_CAMPAIGN_USER (
//     campaign_id,
//     full_name,
//     email,
//     phone
//   ) values (
//     :campaign_id,
//     :fullName,
//     :email,
//     :phone
//   ) returning id
//   into :id`;

// const createQuesResSql =
//   `insert into DDF_CAMPAIGN_RESPONSES (
//     user_id,
//     campaign_id,
//     question,
//     response
//   ) values (
//     :user_id,
//     :campaign_id,
//     :question,
//     :response
//   )`;

// function createQuestionnaireRequest(ques_res){
//   let questionniare_response = new Array();
//   for(i = 0; i < ques_res.length; i++) {
//     const que_res_obj = {
//       user_id: ques_res.user_id,
//       campaign_id: ques_res[i].campaign_id,
//       question: ques_res[i].question,
//       response: ques_res[i].response,
//     };
//     questionniare_response.push(que_res_obj);
//   }
//   return questionniare_response;
// }

// async function submitQuestionnaire(ques_res, user) {
//   let ddf_ques_res;
//   let ddf_user = await saveUser(user);
//   if(ddf_user!=null){
//     ques_res.user_id=ddf_user.id.toString();
//     let ques_db_req = createQuestionnaireRequest(ques_res);
//     ddf_ques_res = await saveQuestionResponse(ques_db_req);
//   }

//   return ddf_ques_res;
// }

// async function saveUser(user){
//   const ddf_user = Object.assign({}, user);

//   ddf_user.id = {
//     dir: oracledb.BIND_OUT,
//     type: oracledb.NUMBER
//   }

//   const result = await database.simpleExecute(createUserSql, ddf_user);

//   ddf_user.id = result.outBinds.id[0];

//   return ddf_user;
// }

// async function saveQuestionResponse(questionResponse = []){
//   var ddf_ques_res = Object.assign([],questionResponse);

//   const result = await database.simpleExecuteMany(createQuesResSql, ddf_ques_res);

//   return ddf_ques_res;
// }

// module.exports.find = find;
// module.exports.create = create;
// module.exports.update = update;
// module.exports.delete = del;
// module.exports.submitQuestionnaire = submitQuestionnaire;
// module.exports.findQuestions = findQuestions;
