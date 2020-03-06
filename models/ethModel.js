var mongoose = require('mongoose');
const schema = mongoose.Schema;


var EthSchema = new schema({
  ethAddress: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Ether", EthSchema);