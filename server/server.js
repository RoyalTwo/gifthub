const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// define a user schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// create a model from the schema
const User = mongoose.model('User', userSchema);

// define the list schema
const listSchema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: { type: String, required: true },
      link: { type: String },
      checked: { type: Boolean, default: false }
    }
  ]
});

// create a model from the schema
const List = mongoose.model('List', listSchema);
// attach an event listener to the login form

function isValidUserName(userName) {
  // check if the user name is not empty
  if (userName.trim().length === 0) {
    return false;
  }

  // check if the user name is not too long
  if (userName.length > 50) {
    return false;
  }

  // check if the user name contains only alphanumeric characters and underscores
  if (!/^\w+$/.test(userName)) {
    return false;
  }

  // the user name is valid
  return true;
}

function isValidPassword(password) {
  // check if the password is not empty
  if (password.trim().length === 0) {
    return false;
  }

  // check if the password is at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // check if the password contains at least one uppercase letter, one lowercase letter, and one digit
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
    return false;
  }

  // the password is valid
  return true;
}

function isValidUser(user) {
  // check if the user object is defined
  if (!user) {
    return false;
  }

  // check if the user name is valid
  if (!isValidUserName(user.name)) {
    return false;
  }

  // check if the password is valid
  if (!isValidPassword(user.password)) {
    return false;
  }

  // the user is valid
  return true;
}

function saveUser(user) {
  // create a new user
  const newUser = new User(user);

  // save the user to the database
  newUser.save((error) => {
    if (error) {
      // handle the error
      console.error(error);
    } else {
      // the user was saved successfully
      console.log('User saved successfully');
    }
  });
}

function updateUser(userId, updatedUser) {
  // update the user in the database
  User.findByIdAndUpdate(userId, updatedUser, (error, user) => {
    if (error) {
      // handle the error
      console.error(error);
    } else {
      // the user was updated successfully
      console.log('User updated successfully');
    }
  });
}

function deleteUser(userId) {
  // delete the user from the database
  User.findByIdAndDelete(userId, (error) => {
    if (error) {
      // handle the error
      console.error(error);
    } else {
      // the user was deleted successfully
      console.log('User deleted successfully');
    }
  });
}
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// FOR USERS
app.get('/users', (req, res) => {
  // handle GET request to retrieve a list of users

  // get the users from the database
  User.find({}, (error, users) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(users);
    }
  });
});

app.post('/users', (req, res) => {
  // get the user data from the request body
  const user = req.body;

  // validate the user data
  if (!isValidUser(user)) {
    // return an error if the user data is not valid
    return res.status(400).send({ error: 'Invalid user data' });
  }

  // save the user to the database
  saveUser(user)
    .then(() => {
      // return a success message if the user was saved successfully
      res.send({ message: 'User created successfully' });
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // return an error message if there was a problem saving the user
      res.status(500).send({ error: 'Error saving user' });
    });
});

app.put('/users/:id', (req, res) => {
  // handle PUT request to update a user

  // get the user ID from the request parameters
  const userId = req.params.id;

  // get the updated user data from the request body
  const updatedUser = req.body;

  // validate the updated user data
  if (!isValidUser(updatedUser)) {
    // return an error if the user data is not valid
    return res.status(400).send({ error: 'Invalid user data' });
  }

  // update the user in the database
  updateUser(userId, updatedUser)
    .then(() => {
      // return a success message if the user was updated successfully
      res.send({ message: 'User updated successfully' });
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // return an error message if there was a problem updating the user
      res.status(500).send({ error: 'Error updating user' });
    });
});

app.delete('/users/:id', (req, res) => {
  // handle DELETE request to delete a user

  // get the user ID from the request parameters
  const userId = req.params.id;

  // delete the user from the database
  deleteUser(userId)
    .then(() => {
      // return a success message if the user was deleted successfully
      res.send({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // return an error message if there was a problem deleting the user
      res.status(500).send({ error: 'Error deleting user' });
    });
});
// FOR LISTS
app.get('/lists/:id', (req, res) => {
  // get the list ID from the request parameters
  const listId = req.params.id;

  // find the list in the database
  List.findById(listId, (error, list) => {
    if (error) {
      // handle the error
      res.status(500).send(error);
    } else {
      // send the list data in the response
      res.send({
        name: list.name,
        link: list.link,
        checked: list.checked
      });
    }
  });
});

app.post('/lists', (req, res) => {
  // get the list data from the request body
  const { name, link, checked } = req.body;

  // create a new list
  const list = new List({ name, link, checked });

  // save the list to the database
  list.save((error) => {
    if (error) {
      // handle the error
      res.status(500).send(error);
    } else {
      // the list was saved successfully
      res.send(list);
    }
  });
});

app.put('/lists/:id', (req, res) => {
  // get the list ID from the request parameters
  const listId = req.params.id;

  // get the updated list data from the request body
  const { name, link, checked } = req.body;

  // update the list in the database
  List.findByIdAndUpdate(listId, { name, link, checked }, (error, list) => {
    if (error) {
      // handle the error
      res.status(500).send(error);
    } else {
      // the list was updated successfully
      res.send(list);
    }
  });
});

app.delete('/lists/:id', (req, res) => {
  // get the list ID from the request parameters
  const listId = req.params.id;

  // delete the list from the database
  List.findByIdAndDelete(listId, (error) => {
    if (error) {
      // handle the error
      res.status(500).send(error);
    } else {
      // the list was deleted successfully
      res.send({ message: 'List deleted successfully' });
    }
  });
});
