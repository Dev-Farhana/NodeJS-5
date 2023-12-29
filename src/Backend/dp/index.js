import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/profile")
.catch(error => handleError(error));


export default mongoose;