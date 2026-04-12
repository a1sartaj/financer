import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('MongoDB has been connected successfully.')
    } catch (error) {
        console.error('Error is occured white connecting to MongoDB and erro is :', error)
    }
}

export default connectDB;