import mongoose from "mongoose";

const URI =
  "mongodb+srv://mongoDBAtlas:CZK39urZQ0G2UOv9@mycluster.ovaat6g.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la BD MongoDB."))
  .catch((error) => console.log(error));
