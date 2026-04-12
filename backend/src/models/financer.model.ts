import mongoose, { Schema } from "mongoose";


interface IFinancer {
    name: string
    email: string
    password: string
}

const financerSchema = new Schema<IFinancer>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true, minlength: 6 },
}, { timestamps: true })

const financerModel = mongoose.model<IFinancer>('Financer', financerSchema)
export default financerModel;
