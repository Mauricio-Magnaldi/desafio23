import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [{
                product: {
                  type: mongoose.SchemaTypes.ObjectId,
                  ref: "Products",
            },
            quantity: {
              type: Number,
              required: true,
              min: 1            
            },
          }]},
             {
                 timestamps: true, 
            }
    )

export const cartsModel = new mongoose.model("Carts", cartsSchema);

/*
POST http://localhost:8080/api/carts
{
  "products":[{"product":"65b343b7e1e2a208160b289b","quantity":3}]
}
*/