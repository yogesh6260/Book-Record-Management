const express = require('express');
const { getAllUsers,
    getUserByID,
    addNewUser,
    updateUserByID,
    deleteUserByID,
    getUserSubscriptionDetailsByID } = require('../controllers/user-controller');

const router = express.Router();


// Route : /users 
// Method: GET 
// Description: Get all the users
// Access: Public 
// Parameters: none 

router.get("/", getAllUsers);

// Route : /users/:id
// Method: GET 
// Description: Get single user by their id
// Access: Public 
// Parameters: id

router.get("/:id", getUserByID)

// Route : /users
// Method: POST 
// Description: Create a new user
// Access: Public 
// Parameters: none

router.post("/", addNewUser)

// Route : /users/:id
// Method: PUT 
// Description: Updating a user data
// Access: Public 
// Parameters: id

router.put("/:id", updateUserByID);

// Route : /users/:id
// Method: DELETE 
// Description: Deleting a user by their id
// Access: Public 
// Parameters: id

router.delete("/:id", deleteUserByID);

// Route : /users/subscription-details/:id
// Method: GET
// Description: Get a user subscription details and fine by their id.
// Access: Public 
// Parameters: id

router.get("/subscription-details/:id", getUserSubscriptionDetailsByID);

// Default Export
module.exports = router;