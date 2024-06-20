const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title:{
      type: String,
      required: true,
    },
    category:{
      type: String,
      enum: ["Agriculture", "Business", "Education", "Entertainement", "Art", "Investment", "Uncategorized", "Weather"],
      message: "{VALUE is not supported}"
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail:{
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },{ timestamps: true , versionKey: false}
);

module.exports = model("Post", postSchema);