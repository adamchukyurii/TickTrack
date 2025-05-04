const projectDao = require("../../dao/project-dao.js");
const taskDao = require("../../dao/task-dao.js");

const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    projectId: { type: "string" },
    date: { type: "string", format: "date" },
  },
  required: ["projectId", "date"],
  additionalProperties: false,
};

async function GetStatisticAbl(req, res) {
  try {
    // Validate query parameters using AJV
    const validate = ajv.compile(schema);
    console.log(ajv.errors);
    const valid = validate(req.body);
    console.log(ajv.errors);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        statistic: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const { projectId, date } = req.body;

    if (isNaN(new Date(date))) {
      return res.status(400).json({
        code: "invalidDate",
        message: "The provided date is not valid.",
      });
    }
    const month = new Date(date).getMonth();
    // Filter tasks by projectId
    const filter = { projectId };
    const taskList = taskDao.list(filter);

    const { project, totalTimeSpent, completeness } = projectDao.list(filter);
    console.log(project, totalTimeSpent, completeness);

    res.json({
      project,
      taskList,
      completeness,
      totalTimeSpent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetStatisticAbl;
