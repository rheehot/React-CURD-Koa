import mongoose from 'mongoose'

const { Schema } = mongoose

const CommentSchema = new Schema({
    boardId: mongoose.Types.ObjectId,
    body: String,
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
    publishedDate: {
        type: Date,
        default: Date.now //현재날짜가 기본값
    },
})


const Comments = mongoose.model('Comments', CommentSchema)
export default Comments