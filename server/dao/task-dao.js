const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const projectDao = require("./project-dao");

const taskFolderPath = path.join(__dirname, "storage", "taskList");

// Method to read an task from a file
function get(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTask", message: error.message };
  }
}

// Method to write an task to a file
function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(task);
    fs.writeFileSync(filePath, fileData, "utf8");
    return task;
  } catch (error) {
    throw { code: "failedToCreateTask", message: error.message };
  }
}

// Method to update task in a file
function update(task) {
  try {
    const currentTask = get(task.id);
    if (!currentTask) return null;
    const newTask = { ...currentTask, ...task };
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(newTask);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newTask;
  } catch (error) {
    throw { code: "failedToUpdateTask", message: error.message };
  }
}

// Method to remove an task from a file
function remove(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveTask", message: error.message };
  }
}

// Method to list tasks in a folder
function list(filter = {}) {
  try {
    const files = fs.readdirSync(taskFolderPath);
    let taskList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(taskFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    const filterDate = filter.date
      ? new Date(filter.date).getMonth()
      : new Date().getMonth();
    taskList = taskList.filter(
      (item) => new Date(item.date).getMonth() === filterDate
    );

    if (filter.projectId) {
      taskList = taskList.filter((item) => item.projectId === filter.projectId);
    }

    taskList.sort((a, b) => new Date(a.date) - new Date(b.date));

    return taskList;
  } catch (error) {
    throw { code: "failedToListTasks", message: error.message };
  }
}

// Method to list tasks by projectId
function listByProjectId(projectId) {
  const taskList = list();
  return taskList.filter((item) => item.projectId === projectId);
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByProjectId,
};
