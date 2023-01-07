const mongoose = require('mongoose');

// connect to the MongoDB database
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true });

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

form.addEventListener('submit', function(event) {
  // prevent the form from being submitted
  event.preventDefault();

  // get the input values
  const userName = form.elements.userName.value;
  const password = form.elements.password.value;

  // validate the input values
  if (!isValidUserName(userName)) {
    // display an error message if the email is not valid
      showErrorMessage('Invalid email.');
  } else if (!isValidPassword(password)) {
    // display an error message if the password is not valid
      showErrorMessage('Invalid password.');
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
