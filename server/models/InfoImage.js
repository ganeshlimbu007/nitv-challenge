const mongoose = require('mongoose');

const infoImageSchema = new mongoose.Schema(
    {
        image:
        {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
const InfoImage = mongoose.model("InfoImage", infoImageSchema);
module.exports = InfoImage;