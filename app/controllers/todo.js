const fs = require("fs");
const dataPath = "./data.json";
module.exports.createTodo = async (req, res) => {
  try {
    let { title } = req.body;

    let existingData = fs.readFileSync(dataPath);
    existingData = JSON.parse(existingData);
    existingData.push({ id: createId(), title });
    fs.writeFileSync(dataPath, JSON.stringify(existingData));
    return res.json({ success: true, message: "Todo created" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports.listAllTodo = async (req, res) => {
  try {
    let data = fs.readFileSync(dataPath);
    return res.json({ success: true, data: JSON.parse(data) });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports.getTodoById = async (req, res) => {
  try {
    let { id } = req.params;

    let data = fs.readFileSync(dataPath);
    data = JSON.parse(data);
    let filter = data.find((item) => item.id == id);
    if (filter) {
      return res.json({ success: true, data: filter });
    } else {
      return res.json({ success: true, data: {} });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports.deleteTodoById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = fs.readFileSync(dataPath);
    data = JSON.parse(data);

    // find with id
    data.find((item, index) => {
      if (item.id == id) {
        data.splice(index, 1);
        fs.writeFileSync(dataPath, JSON.stringify(data));
        return true;
      }
    });
    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports.updateTodoById = async (req, res) => {
  try {
    let { id } = req.params;
    let { title } = req.body;

    let data = fs.readFileSync(dataPath);
    data = JSON.parse(data);

    // find with id
    data.find((item, index) => {
      if (item.id == id) {
        data[index].title = title;
        fs.writeFileSync(dataPath, JSON.stringify(data));
      }
    });
    return res.json({ success: true, message: "updated" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

module.exports.sortAllTodo = async (req, res) => {
  try {
    // sorted using id in desc order
    let data = fs.readFileSync(dataPath);
    data = JSON.parse(data);
    data = data.sort((a, b) => b.id - a.id);
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error occured" });
  }
};

function createId() {
  return Date.now();
}
