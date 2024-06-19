const express = require("express");
const router = express.Router();

const {
    getAllPendingTransactionsTest,
    transactionStatus,
    getAllUsers,
    getUserDetails,
  } = require("../controllers/testControllers.js");


router.route("/reviewStatus1").get(getAllPendingTransactionsTest);
router.route("/updateTransactionsStatus").post(transactionStatus);
router.route("/users").get(getAllUsers);
router.route("/users/:userId/accounts").get(getUserDetails);


module.exports = router;