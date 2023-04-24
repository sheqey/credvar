const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    merchantRequestID: {
      type: String,
      default:null
    },
    checkoutRequestID: {
      type: String,
      default:null
    },
    resultCode: {
      type: String,
      default:null
    },
    resultDesc: {
      type: String,
      default:null
    },
    amount: {
      type: String,
      default:null
    },
    mpesaReceiptNumber: {
      type: String,
      default:null
    },
    transactionDate: {
      type: String,
      default:null
    },
    phoneNumber: {
      type: String,
      default:null
    }
  });

  
  const Transaction = mongoose.model('Transaction', transactionSchema);

  module.exports = Transaction
  