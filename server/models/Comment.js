const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            default: "Not Specified",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        renterPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RenterPost",
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

module.exports = mongoose.model("Comment", commentSchema);
