const mongoose = require("mongoose");

const renterPostSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please enter a comment"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        state: {
            type: String,
            required: [true, "Please enter a state"],
        },
        city: {
            type: String,
            required: [true, "Please enter a city"],
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    { versionKey: false } // to not save the __v attribute ... // Source: https://mongoosejs.com/docs/guide.html#versionKey
);

module.exports = mongoose.model("RenterPost", renterPostSchema);
