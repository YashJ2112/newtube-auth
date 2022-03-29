import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  body: String,
  author: String,
  date_posted: String,
});
