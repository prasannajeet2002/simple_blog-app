const mongoose = require('mongoose')

const articleSchema= new mongoose.Schema({
    title: {
        type : String,
        required: true 
    },
    description: {
        type : String, 
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    createdat: {
        type: Date, 
        default: Date.now()
    }
}) 

const Article =new mongoose.model('Article',articleSchema)
module.exports = Article;