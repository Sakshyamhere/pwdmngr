import mongoose from 'mongoose';

const DBurl = process.env.DB_URI;

export default async function connectDB() {
  try {
    await mongoose.connect(DBurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; // Rethrow the error for the calling code to handle
  }
}