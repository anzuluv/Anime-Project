const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: false
    },
    power_level: {
        type: String,
        required: true,
    },
    anime: {
        type: String,
        required: true,
    },
});

const CharacterModel = mongoose.model("Characters", CharacterSchema);
module.exports = CharacterModel;