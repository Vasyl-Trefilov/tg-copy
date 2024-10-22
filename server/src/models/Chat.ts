import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  groupName: {
    type: String,
    default: ""
  },
  groupAvatar: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);
