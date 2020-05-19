const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./ultis");

// SHOW
exports.show = (request, response) => {
  const { id } = request.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return response.send("Instrutor não encontrado.");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-br").format(
      foundInstructor.created_at
    ),
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
};

// EDIT
exports.edit = function (request, response) {
  const { id } = request.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return response.send("Instrutor não encontrado.");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return response.render("instructors/edit", { instructor });
};

// PUT
exports.put = function (request, response) {
  const { id } = request.body;

  let index = 0;

  const foundInstructor = data.instructors.find(function (
    instructor,
    foundIndex
  ) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return response.send("Instrutor não encontrado.");

  const instructor = {
    ...foundInstructor,
    ...request.body,
    birth: Date.parse(request.body.birth),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send("Temos erro!");
  });

  return response.redirect(`/instructors/${id}`);
};

// DELETE
exports.delete = function (request, response) {
  const { id } = request.body;

  let filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send("Temos erro!");

    return response.redirect(`/instructors`);
  });
};
