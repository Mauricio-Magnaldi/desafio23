import { cartsModel } from "../models/carts.model.js";
import BasicManager from "./basicManager.js";

class CartsManager extends BasicManager {
    constructor(){
        super(cartsModel)
    }

    async deleteProductFromCart(cid, pid){
        const cartObjectId = ObjectId(cid);
        const productObjectId = ObjectId(pid);
        console.log(cartObjectId, productObjectId);
        try {
            /*
            const deletedProduct = await this.updateOne(
                {
                    { _id: cartObjectId},
                    { $pull: { product: { id: productObjectId} } }
        });
            if(deletedProduct.modifiedCount === 0) {
                return "Producto no eliminado";
            } else {
                return "Producto eliminado";
            } */          
        } catch (err) {
            /*
            throw new Error(err.message);            
        */
        }
    }


    
    async getCartById(cid) {
        
        const cart = await this.findById(cid)//.populate("products");
        return cart;
    }
/*
    Revisar esta función, verificar a que entrega corresponde y que piden
    async deleteAllProductsFromCart(cid) {
        const { cid } = cid;
        $pull elimina todos los productos de un arreglo en mongodb
        /*
        var newvalues = { $set: {products: [] } };
  dbo.collection("carritos").updateOne(cid, newvalues, function(err, res)
  */
   /*     const cart = await this.deleteAllProductsFromCart(cid);
        return cart;
    }
    */
    
}

export const cartsManagerMongoDB = new CartsManager();
