const express = require("express");
const router = express.Router();
const GetAbl = require("../abl/statistic/getAbl");

// GET /statistic/project-stats
router.get("/", GetAbl);

module.exports = router;
