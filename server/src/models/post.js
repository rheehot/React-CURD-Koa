import mongoose from 'mongoose'

const { Schema } = mongoose

const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now //현재날짜가 기본값
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    }
})

const Post = mongoose.model('Post', PostSchema)
export default Post