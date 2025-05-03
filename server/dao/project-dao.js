const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const projectFolderPath = path.join(__dirname, "storage", "projectList");

// Method to read an project from a file
function get(projectId) {
  try {
    const filePath = path.join(projectFolderPath, `${projectId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadProject", project: error.project };
  }
}

// Method to write an project to a file
function create(project) {
  try {
    const projectList = list();
    if (projectList.some((item) => item.name === project.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists project with given name",
      };
    }

    project.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(projectFolderPath, `${project.id}.json`);
    const fileData = JSON.stringify(project);

    fs.writeFileSync(filePath, fileData, "utf8");
    return project;
  } catch (error) {
    throw { code: "failedToCreateProject", project: error };
  }
}

// Method to update project in a file
function update(project) {
  try {
    const currentProject = get(project.id);
    if (!currentProject) return null;

    if (project.name && project.name !== currentProject.name) {
      const projectList = list();
      if (projectList.some((item) => item.name === project.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "exists project with given name",
        };
      }
    }

    const newProject = { ...currentProject, ...project };
    const filePath = path.join(projectFolderPath, `${project.id}.json`);
    const fileData = JSON.stringify(newProject);
    console.log(newProject, filePath, fileData);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newProject;
  } catch (error) {
    throw { code: "failedToUpdateProject", project: error.project };
  }
}

// Method to remove an project from a file
function remove(projectId) {
  try {
    const filePath = path.join(projectFolderPath, `${projectId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveProject", project: error.project };
  }
}

// Method to list projects in a folder
function list() {
  try {
    const files = fs.readdirSync(projectFolderPath);
    const projectList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(projectFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return projectList;
  } catch (error) {
    throw { code: "failedToListProjects", project: error.project };
  }
}

// get projectMap
function getProjectMap() {
  const projectMap = {};
  const projectList = list();
  projectList.forEach((project) => {
    projectMap[project.id] = project;
  });
  return projectMap;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  getProjectMap,
};
