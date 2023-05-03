const mongoose  = require('mongoose')

const userSchema = mongoose.Schema({
   name:  { type: String, required: true, unique: false },
   email:  { type: String, required: true, unique: true },
   
});

const User = mongoose.model("user", userSchema);
exports.User = User;