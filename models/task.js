const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    fornisseurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fornisseur' },
});

module.exports = mongoose.model('Task', taskSchema);
