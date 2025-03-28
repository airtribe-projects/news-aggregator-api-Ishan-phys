const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  source: {
    id: { type: String, default: null },
    name: { type: String }
  },
  author: String,
  title: String,
  description: String,
  url: { type: String, required: true }, // original source link
  urlToImage: String,
  publishedAt: Date,
  content: String
}, { _id: false });

const userNewsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  articleId: {
    type: String,
    required: true // should be unique per article (e.g., encoded or hashed url)
  },
  article: {
    type: articleSchema,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  favourite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Unique per user-article pair
userNewsSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const UserNews = mongoose.model('UserNews', userNewsSchema);
module.exports = UserNews;
