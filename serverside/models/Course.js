const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
