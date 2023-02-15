import mongoose from "mongoose";

const connectDB = () => {
    mongoose.set('strictQuery', true);

    mongoose.connect(process.env.DATABASE_URL)
        .then(() => { console.log("Database connected") })
        .catch((error) => { console.log(error) })
}

export default connectDB