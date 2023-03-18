import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    address: {
        type: String,
    },
    images: {
        fileId: {
            type: String,
        },
    },
    members: [{
        count: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    violation: [{
        image: {
            fileId: {
                type: String,
            },
        },
        description: {
            type: String,
        },
    }],
    username: {
        type: String,
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    pollingStation: {
        type: Number,
    },
    chatId: {
        type: Number,
    },
    // fullLocation: {},
    date: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model("Area", areaSchema);