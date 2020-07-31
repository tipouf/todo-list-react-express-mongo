const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  // _id: {type: Number, required: false},
  titre: { type: String, required: true },
  description: { type: String, required: true},
  date: { type: Date, required: false },
  rating: { type: Number, required: false, defaultTo: 0 },
  check: { type: Boolean, required: false, defaultTo: false }
});

module.exports = mongoose.model('Todo', todoSchema);