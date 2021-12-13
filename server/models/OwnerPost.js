const mongoose = require("mongoose");

const ownerPostSchema = mongoose.Schema(
    {
        // label: { type: String, default: "Not Specified" },
        adress: {
            type: String,
            required: [true, "Please enter an adress"],
        },
        description: {
            type: String,
            required: [true, "Please enter a description"],
        },
        numberOfRooms: {
            type: Number,
            required: [true, "Please enter a number of rooms"],
        },
        pictures: [
            {
                type: String,
                required: [true, "Please upload at least a picture"],
            },
        ],
        price: {
            type: Number,
            required: [true, "Please enter a price"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

module.exports = mongoose.model("OwnerPost", ownerPostSchema);
