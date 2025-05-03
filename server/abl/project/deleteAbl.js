const Ajv = require("ajv");
const ajv = new Ajv();
const projectDao = require("../../dao/project-dao.js");
const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        project: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check there is no task related to given project
    const taskList = taskDao.listByProjectId(reqParams.id);
    if (taskList.length) {
      res.status(400).json({
        code: "projectWithTasks",
        message: "project has related tasks and cannot be deleted",
        validationError: ajv.errors,
      });
      return;
    }

    // remove task from persistant storage
    projectDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    res.status(500).json({ project: e.project });
  }
}

module.exports = DeleteAbl;
