const Account = require("../models/accountModel");

const User = require("../models/userModel");

const getAllPendingTransactionsTest = async (req, res) => {
    try {
      const pendingTransactions = await Account.find({
        'out': { $elemMatch: { status: 'pending' } }
      });
      
      // Log pending transactions
      console.log("Pending Transactions:", pendingTransactions);
  
      res.status(200).json(pendingTransactions);
    } catch (error) {
      console.error("Error fetching pending transactions:", error);
      res.status(500).send("Unable to fetch pending transactions.");
    }
  };


  const getAllUsers = async (req, res) => {
    try {
      // Find all users where the role is not 'merchant'
      const users = await User.find({ role: { $ne: 'merchant' } });
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  const transactionStatus =  async (req, res) => {
    console.log(req)
    const { accountId,transactionId, status, receiveId, balanceTransfered, correspondingTransactionId} = req.body;

    console.log("balanceTransfered",balanceTransfered)
    try {
      const sendingAccount = await Account.findById(accountId);
      const receivingAccount = await Account.findById(receiveId);

    if( status == "approved"){
      sendingAccount.balance -= +balanceTransfered;
      sendingAccount.markModified("balance");
      receivingAccount.balance += +balanceTransfered;
      receivingAccount.markModified("balance");
    
      sendingAccount.markModified("out");
      
      receivingAccount.markModified("in");
      const updatedSendingAccount = await sendingAccount.save();
      const updatedReceivingAccount = await receivingAccount.save();
      req.transfered = {
        updatedSendingAccount,
        updatedReceivingAccount,
        balanceTransfered,
      };
      const transaction = sendingAccount.out.id(transactionId);
      if (transaction) {
          transaction.status = status
          console.log('Transaction found:', transaction);
      } else {
          console.log('Transaction not found');
      }
      await sendingAccount.save();

      const receive = receivingAccount.in.id(correspondingTransactionId);
      if (receive) {
          receive.status = status
          console.log('Transaction found:', receive);
      } else {
          console.log('Transaction not found');
      }
      await receivingAccount.save();
  
      if (!transaction) {
          return res.status(404).json({ message: 'Transaction not found or not pending' });
      }
      res.json({ message: 'Transaction updated successfully', transaction }); 
    }else if(status == "rejected"){
      const transaction = sendingAccount.out.id(transactionId);
      if (transaction) {
          transaction.status = status
          console.log('Transaction found:', transaction);
      } else {
          console.log('Transaction not found');
      }
      await sendingAccount.save();

      const receive = receivingAccount.in.id(correspondingTransactionId);
      if (receive) {
          receive.status = status
          console.log('Transaction found:', receive);
      } else {
          console.log('Transaction not found');
      }
      await receivingAccount.save();
      res.json({ message: 'Transaction updated successfully' }); 
    }
   
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Failed to update transaction' });
    }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming that accounts are linked to users via a field like 'userId' in the Account model
    const accounts = await Account.find({ userId: userId });

    res.status(200).json({ user, accounts });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Unable to fetch user details.");
  }
};


  module.exports = {
    getAllPendingTransactionsTest,
    transactionStatus,
    getAllUsers,
    getUserDetails,
  }