var Userdb = require("../model/model");

// create and save new user
exports.create = (req, res) => {
  // validate requesr
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user to database
  user
    .save(user)
    .then((data) => {
      //   res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating a user",
      });
    });
};

// retrieve and return all users/retrieve and return single user
exports.find = (req, res) => {
  // get a single user by id
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "cannot find user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retrieving user with id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retrieving user information",
        });
      });
  }
};

// update a new identified user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Empty Data cannot be updated" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot Update user with ${id},Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    }
  );
  try {
  } catch (error) {
    res.status(500).send({ message: "Error Updating User Information" });
  }
};

// delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete user with id ${id}, maybe id is invalid`,
        });
      } else {
        res.send({ message: "User deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete user with id" + id,
      });
    });
};
