const { Schema, Types, model } = require('mongoose')

const schema = new Schema({
  code: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  img: { type: String },
  color: { type: String },
})

module.exports = model('Card', schema)
