const { Schema, model, Types } = require("mongoose");
const { CommentSchema } = require("./Comment");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false },
    // user: {type: Types.ObjectId, required: true, ref: 'user'},
    user: new Schema({
      _id: { type: Types.ObjectId, required: true, ref: "user" },
      username: { type: String, required: true },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
    }),
    commentsCount: { type: Number, default: 0, required: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

BlogSchema.index({ "user._id": 1, updatedAt: 1 });
BlogSchema.index({ title: "text", content: "text" });

// virtual populate
// BlogSchema.virtual("comments", {
//   ref: "comment",
//   localField: "_id",
//   foreignField: "blog",
// });

// db에는 저장 안됨
// BlogSchema.set("toObject", { virtuals: true });
// BlogSchema.set("toJSON", { virtuals: true });

const Blog = model("blog", BlogSchema);

module.exports = { Blog };
