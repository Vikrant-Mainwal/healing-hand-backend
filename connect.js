import mongoose from "mongoose";

const Connect = async () => {
    mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb+srv://VikrantM:Okuser@cluster0.9ixj6l5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));
}

export default Connect