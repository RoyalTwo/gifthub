const mongoose = require('mongoose');
require('dotenv').config()

// connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, { dbName: 'gifthub' });
mongoose.set('strictQuery', false)

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
const form = document.getElementById('login-form');

function showErrorMessage(message) {
  // create a new element to hold the error message
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;

  // get the element that the error message should be inserted before
  const form = document.getElementById('login-form');
  const formControls = form.querySelector('.form-controls');

  // insert the error message element before the form controls
  form.insertBefore(errorMessage, formControls);
}

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


form.addEventListener('submit', function(event) {
  // prevent the form from being submitted
  event.preventDefault();

  // get the input values
  const userName = form.elements.userName.value;
  const password = form.elements.password.value;

  // validate the input values
  if (!isValidUserName(userName)) {
    // display an error message if the username is not valid
      showErrorMessage('Invalid username.');
      return;
  } else if (!isValidPassword(password)) {
    // display an error message if the password is not valid
      showErrorMessage('Invalid password.');
      return;
  } else {
    // find the user in the database
    User.findOne({ userName: userName }, function(error, user) {
      if (error) {
        // log the error to the console
    console.error(error);
    // display an error message to the user
    showErrorMessage('An error occurred. Please try again later.');     
      } else if (!user) {
        // display an error message if the user was not found
          showErrorMessage('User does not exist.');
      } else {
        // compare the passwords
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (passwordMatch) {
          // login was successful, redirect the user to the logged-in version of the website
          window.location.href = '/dashboard';
        } else {
          // display an error message if the passwords do not match
            showErrorMessage('Passwords do not match');
        }
      }
    });
  }
});
form.addEventListener('submit', (event) => {
  // prevent the default form submission behavior
  event.preventDefault();

  // get the form data
  const data = new FormData(form);

  // create a new list item
  const listItem = new List({
    name: data.get('name'),
    link: data.get('link'),
    checked: data.get('checked')
  });

  // save the list item to the database
  listItem.save((error, item) => {
    if (error) {
      // handle the error
        console.error(error);
    } else {
      // the list item was saved successfully
        console.log(item);
    }
  });
});
