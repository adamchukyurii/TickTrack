const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
projectDao = require("../../dao/project-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    label: { type: "string", maxLength: 150 },
    status: { type: "number" },
    date: { type: "string", format: "date" },
    periodOfExecution: { type: "number" },
    projectId: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // validate date
    if (new Date(task.date) >= new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `date must be current day or a day in the past`,
        validationError: ajv.errors,
      });
      return;
    }

    // update task in database
    const updatedTask = taskDao.update(task);

    // check if projectId exists
    const project = projectDao.get(updatedTask.projectId);
    if (!project) {
      res.status(400).json({
        code: "projectDoesNotExist",
        message: `Project with id ${updatedTask.projectId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }

    if (!updatedTask) {
      res.status(404).json({
        code: "taskNotFound",
        message: `Task ${task.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    updatedTask.project = project;
    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
