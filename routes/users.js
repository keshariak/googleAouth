const mongoose = require("mongoose");
// var plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/googleAouth");
// mongoose.connect("mongodb://localhost:27017/googleAouth");

const userSchema = mongoose.Schema({
  email: { type: String },
  username: { type: String }
});

// userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema);