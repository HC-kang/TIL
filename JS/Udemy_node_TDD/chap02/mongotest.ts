import mongoose from 'mongoose';

async function mongoRun() {
  await mongoose.connect('mongodb://localhost/my_database');

  const Schema = mongoose.Schema;

  const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: Date,
  });

  const BlogPostModel = mongoose.model('BlogPosts', BlogPostSchema);

  const doc1 = await BlogPostModel.create({
    title: 'test title',
    body: 'test body',
    date: new Date(),
  });

  console.log('doc1', doc1);

  const doc2 = await BlogPostModel.findOne({
    title: 'test title',
  });
  console.log('doc2', doc2);

  const doc3 = await BlogPostModel.deleteOne({
    title: 'test title',
  });
  console.log('doc3', doc3);

  const doc4 = await BlogPostModel.findOne({
    title: 'test title',
  });
  console.log('doc4 - non exist', doc4);
}

mongoRun();
