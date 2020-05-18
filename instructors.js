const fs = require("fs");
const data = require("./data.json");

// GET
exports.show = (request, response) => {
  const { id } = request.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return response.send("Instrutor não encontrado.");

  const instructor = {
    ...foundInstructor,
    age: "",
    services: foundInstructor.services.split(","),
    created_at: "",
  };

  return response.render("instructors/show", { instructor });
};

// CREATE
exports.post = (request, response) => {
  const keys = Object.keys(request.body);

  for (key of keys) {
    if (request.body[key] == "")
      return response.send("Por favor reveja os campos!!");
  }

  request.body.birth = Date.parse(request.body.birth);
  request.body.created_at = Date.now();
  request.body.id = Number(data.instructors.length + 1);

  const {
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  } = request.body;

  data.instructors.push({
    avatar_url,
    birth,
    created_at,
    id,
    name,
    services,
    gender,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send("Write file error!");

    return response.redirect("/instructors");
  });

  // return response.send(request.body);
};
