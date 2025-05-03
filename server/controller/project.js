const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/project/getAbl");
const ListAbl = require("../abl/project/listAbl");
const CreateAbl = require("../abl/project/createAbl");
const UpdateAbl = require("../abl/project/updateAbl");
const DeleteAbl = require("../abl/project/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
