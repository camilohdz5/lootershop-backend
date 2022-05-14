import mongoose from "mongoose";

const SERVICE_TAG = "[Mongoose]";

const connectDB = async () : Promise<void> => {
  try {
    // TODO: Put URL in the dotenv file
    const db = await mongoose.connect(
      "mongodb+srv://camilohdz5:a3pon5Tn7BmWdIkl@cluster0.jfo97.mongodb.net/lootershop-db?retryWrites=true&w=majority"
    );
    // TODO : Make a logger
    console.log(`${SERVICE_TAG} Connected to ${db.connection.name}`);
  } catch (err) {
    console.error(`${SERVICE_TAG} connecting DB err: ${err}`);
  }
};

export default connectDB;
