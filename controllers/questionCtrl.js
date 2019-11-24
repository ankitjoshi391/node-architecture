const questionDBAPI = require('../db_apis/questionDB.js');

async function getQuestion(req, res, next){
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    // context.sort = req.query.sort;
    
    const questions = await questionDBAPI.find(context);
    const rows = await questionDBAPI.getOptionsArray(questions);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

function getQuestionFromReq(req) {
  const question = {
    question: req.body.question,
    response_type: req.body.responseType,
    options: req.body.options
  };

  return question;
}

async function createQuestion(req, res, next) {
  try {
    let question = getQuestionFromReq(req);

    question = await questionDBAPI.create(question);

    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
}

async function updateQuestion(req, res, next) {
  try {
    let question = getQuestionFromReq(req);

    question.question_id = parseInt(req.params.id, 10);

    question = await questionDBAPI.update(question);

    if (question !== null) {
      res.status(200).json(question);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

async function deleteQuestion(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await questionDBAPI.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.getQuestion = getQuestion;
module.exports.createQuestion = createQuestion;
module.exports.updateQuestion = updateQuestion;
module.exports.deleteQuestion = deleteQuestion;