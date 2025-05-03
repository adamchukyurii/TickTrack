const Ajv = require("ajv");
const ajv = new Ajv();

const projectDao = require("../../dao/project-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string" },
    description: { type: "string" },
    runTime: {
      type: "object",
      properties: {
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
      },
      required: ["startDate", "endDate"],
      additionalProperties: false,
    },
    hours: { type: "number" },
    goal: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    // update project in persistent storage
    let updatedProject;
    try {
      updatedProject = projectDao.update(project);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedProject) {
      res.status(404).json({
        code: "projectNotFound",
        project: `Project with id ${project.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedProject);
  } catch (e) {
    res.status(500).json({ project: e.project });
  }
}

module.exports = UpdateAbl;
