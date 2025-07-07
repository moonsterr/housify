import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(conn.connection.host);
  } catch (err) {
    console.log('mongodb connection failed', err);
    process.exit();
  }
};

export default connectDb;
