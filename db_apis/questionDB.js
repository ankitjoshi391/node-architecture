// const oracledb = require('oracledb');
// const database = require('../services/dbService.js');

// const baseQuery =
//  `select id "question_id",
//     question "question",
//     response_type "response_type",
//     options "options"
//   from ddf_campaign_questions
//   where 1 = 1`;

// const sortableColumns = ['id'];

// async function find(context) {
//   let query = baseQuery;
//   const binds = {};

//   if (context.id) {
//     binds.question_id = context.id;

//     query += '\nand id = :question_id';
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

// async function getOptionsArray(questions){
//   const binds = {};
//   for(i = 0; i < questions.length; i++) {
//     let optionsArray = questions[i].options.split(',');
//     questions[i]['options'] = optionsArray;
//   }
//   return questions;
// }

// const createSql =
//  `insert into DDF_CAMPAIGN_QUESTIONS (
//     question,
//     response_type,
//     options
//   ) values (
//     :question,
//     :response_type,
//     :options
//   ) returning id
//   into :id`;

// async function create(question) {
//   const ddf_question = Object.assign({}, question);

//   ddf_question.id = {
//     dir: oracledb.BIND_OUT,
//     type: oracledb.NUMBER
//   }

//   const result = await database.simpleExecute(createSql, ddf_question);

//   ddf_question.id = result.outBinds.id[0];

//   return ddf_question;
// }

// const updateSql =
// `update DDF_CAMPAIGN_QUESTIONS
//   set question = :question,
//   response_type = :response_type,
//   options = :options
// where id = :question_id`;

// async function update(question) {
//   const ddf_question = Object.assign({}, question);
//   const result = await database.simpleExecute(updateSql, ddf_question);

//   if (result.rowsAffected && result.rowsAffected === 1) {
//     return ddf_question;
//   } else {
//     return null;
//   }
// }

// const deleteSql =
//  `begin

//     delete from DDF_CAMPAIGN_QUESTIONS
//     where id = :id;

//     :rowcount := sql%rowcount;

//   end;`

// async function del(question_id) {
//   const binds = {
//     id: question_id,
//     rowcount: {
//       dir: oracledb.BIND_OUT,
//       type: oracledb.NUMBER
//     }
//   }
//   const result = await database.simpleExecute(deleteSql, binds);

//   return result.outBinds.rowcount === 1;
// }

// module.exports.find = find;
// module.exports.create = create;
// module.exports.update = update;
// module.exports.delete = del;
// module.exports.getOptionsArray = getOptionsArray;
