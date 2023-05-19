import mongoose from 'mongoose';

async function mongoRun() {
  await mongoose.connect('mongodb://localhost:27017/test');

  const Schema = mongoose.Schema;

  const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: Date,
  });

  const BlogPostModel = mongoose.model('BlogPosts', BlogPostSchema);

  const doc1 = await BlogPostModel.create({
    title: 'title1',
    body: 'body1',
    date: new Date(),
  });

  console.log('doc1', doc1);

  const doc2 = await BlogPostModel.findOne({ title: 'title1' });
  console.log('doc2', doc2);

  const doc3 = await BlogPostModel.deleteOne({ title: 'title1' });
  console.log('doc3', doc3);

  const doc4 = await BlogPostModel.findOne({ title: 'title1' });
  console.log('doc4', doc4);
}

mongoRun();
