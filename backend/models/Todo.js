const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  // _id: {type: Number, required: false},
  titre: { type: String, required: true },
  description: { type: String, required: false},
  date: { type: Date, required: false },
  check: { type: Boolean, required: false, defaultTo: false }
});

module.exports = mongoose.model('Todo', todoSchema);