const fs = require("fs");
const data = require("./data.json");

// CREATE
exports.post = (request, response) => {
  const keys = Object.keys(request.body);

  for (key of keys) {
    if (request.body[key] == "")
      return response.send("Por favor reveja os campos!!");
  }

  request.body.birth = Date.parse(request.body.birth);
  request.body.created_at = Date.now();

  data.instructors.push(request.body);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });

  // return response.send(request.body);
};
