const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// use the body-parser middleware to parse the request body
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get('/users', (req, res) => {
  // handle GET request to retrieve a list of users

  // get the users from the database
  getUsers()
    .then((users) => {
      // return the users to the client
      res.send(users);
    })
    .catch((error) => {
      // log the error to the console
      console.error(error);

      // return an error message to the client
      res.status(500).send({ error: 'Error retrieving users' });
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
