const Ajv = require("ajv");
const ajv = new Ajv({ addDefaults: true });
const addFormats = require("ajv-formats").default;
addFormats(ajv);

const projectDao = require("../../dao/project-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string", maxLength: 300 },
    runTime: {
      type: "object",
      properties: {
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
      },
      required: ["startDate", "endDate"],
      additionalProperties: false,
    },
    hours: { type: "number", default: 0 },
    goal: { type: "string" },
    tasks: { type: "number", default: 0 },
    completeness: { type: "number", default: 0, minimum: 0, maximum: 100 },
  },
  required: ["name", "runTime", "goal"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let project = req.body;

    // validate input
    const valid = ajv.validate(schema, project);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        project: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store project to a persistant storage
    try {
      project = projectDao.create(project);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(project);
  } catch (e) {
    res.status(500).json({ project: e.project });
  }
}

module.exports = CreateAbl;
