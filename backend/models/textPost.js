import mongoose from "mongoose";

const Text = new mongoose.Schema({
    name: { type: String, required: true },
    input: { type: String, required: true },
    result: { type: String, required: true }
})

const postSchema = mongoose.model('Text', Text)
export default postSchema