const Ajv = require("ajv");
const ajv = new Ajv();
const projectDao = require("../../dao/project-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

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

    // read project by given id
    const project = projectDao.get(reqParams.id);
    if (!project) {
      res.status(404).json({
        code: "projectNotFound",
        project: `Project with id ${reqParams.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(project);
  } catch (e) {
    res.status(500).json({ project: e.project });
  }
}

module.exports = GetAbl;
