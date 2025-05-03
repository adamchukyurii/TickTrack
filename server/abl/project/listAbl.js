const projectDao = require("../../dao/project-dao.js");

async function ListAbl(req, res) {
  try {
    const projectList = projectDao.list();
    res.json({ itemList: projectList });
  } catch (e) {
    res.status(500).json({ project: e.project });
  }
}

module.exports = ListAbl;
