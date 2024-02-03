import { Router } from "express";
import {cartsManagerMongoDB} from "../dao/managersMongoDB/cartsManagerMongoDB.js";

const router = Router();

router.get("/", async (req,res) => {
    try {
        const carts = await cartsManagerMongoDB.findAll();
        res.json({carts});
    } catch (err) {
        res.status(500).json({message: error.message});
    }
})

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    try {
        const cartById = await cartsManagerMongoDB.findById(cid);
       res.json({cartById});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

    router.get("/populate/:cid", async (req, res) => {
        const {cid} = req.params;
        try {
            const cartById = await cartsManagerMongoDB.findByIdP(cid);
            /*
        if (cartById) {
            const productsWithQuantitiesInCart = cartById.products.map(product => ({
                id: product.id,
                quantity: product.quantity
            }));
            res.status(200).json({
                message: `Carrito con el id ${cid} encontrado. Sus productos son:`,
                products: productsWithQuantitiesInCart
            });
        } else {
            
            res.status(400).json({message: `Código de Error 404. Carrito con id: ${cid} no encontrado.`});
       }
       */
            res.json({cartById});
        } catch (error) {
            res.status(500).json({message: error.message});
        }

})

/*POST http://localhost:8080/api/carts/ 
{
    "products": ["65b344b3988f9e776a786662"]
}
*/
router.post('/', async (req, res) => {
        try {
            const cart = await cartsManagerMongoDB.createOne(req.body);
            res.json({cart});
            // res.status(200).json({ mensaje: cart/*`Carrito con el id ${newCart.id} creado con éxito.`*/});
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
    }
});

/*
La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo products del carrito seleccionado:
products -> contiene su id
quantity -> contiene la cantidad del id producto especificado arriba
*/

router.post("/:cid/product/:pid", async (req, res) => {
/*
    const {cid, pid} = req.params
    let { quantity } = req.body 
    //verifica si se envió cantidad, de lo contrario el método updateCart le asigna por defecto el valor 1.
    /*
    Quantity debe contener el numero de items del mismo producto. El producto de momento se agregará de uno en uno.
    */
   /*
    if(typeof quantity !== "number" || isNaN(quantity)) {
           quantity = 1
       }
       
    try {
        const updatedCart = await cartsManagerMongoDB.updateCart(+cid, +pid, quantity)
        console.log("updatedCart", updatedCart)
        if ( updatedCart ) {
            res.status(200).json({mensaje: `Del producto ${pid} se agregaron ${quantity} unidades al carrito ${cid} con éxito.`})
        } else {
            res.status(404).json({mensaje: `No se encontro el carrito con el id ${cid}.`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    */
})

router.delete("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    try {
        const deletedProduct = await cartsManagerMongoDB.deletedProduct(cid, pid);    
        res.status(200).json({mensaje: "Producto eliminado.", deletedProduct})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }    
})

router.delete("/carts/:cid", async (req, res) => {
    const {cid} = req.params;
    try {
        const deletedProduct = await cartsManagerMongoDB.deletedProduct(cid, pid);    
        res.status(200).json({mensaje: "Producto eliminado.", deletedProduct})
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
 })

export default router;
