const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv({ addDefaults: true });
addFormats(ajv);

const taskDao = require("../../dao/task-dao.js");
const projectDao = require("../../dao/project-dao.js");

const schema = {
  type: "object",
  properties: {
    label: { type: "string", maxLength: 150 },
    status: { type: "number" },
    date: { type: "string", format: "date" },
    periodOfExecution: { type: "number", default: 0 },
    projectId: { type: "string" },
  },
  required: ["status", "label", "date", "projectId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    // check if projectId exists
    const project = projectDao.get(task.projectId);

    if (!project) {
      res.status(400).json({
        code: "projectDoesNotExist",
        message: `project with id ${task.projectId} does not exist`,
        validationError: ajv.errors,
      });
      return;
    }
    // validate date
    const taskDate = new Date(task.date);
    const projectStartDate = new Date(project.runTime.startDate);
    const projectEndDate = new Date(project.runTime.endDate);
    if (taskDate < projectStartDate || taskDate > projectEndDate) {
      throw {
        code: "invalidDate",
        message: `Date must be between ${project.runTime.startDate} and ${project.runTime.endDate}`,
      };
    }
    const allowedStatuses = [-1, 0, 1];
    if (!allowedStatuses.includes(task.status)) {
      throw {
        code: "invalidStatus",
        message: `Status must be one of ${allowedStatuses}`,
      };
    }

    if (task.periodOfExecution === undefined) {
      task.periodOfExecution = 0;
    }
    // store task to persistent storage
    task = taskDao.create(task);
    project.tasks++;
    task.project = project;

    // return properly filled dtoOut
    res.json(task);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
