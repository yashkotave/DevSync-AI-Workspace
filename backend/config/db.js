const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devsync';
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`[MongoDB] connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('[MongoDB] connection error:', error.message);
    console.warn('[MongoDB] continuing without DB connection. Some features will be disabled.');
  }
};

module.exports = connectDB;
