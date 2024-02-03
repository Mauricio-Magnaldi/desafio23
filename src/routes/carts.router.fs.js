import { cartsManager } from "../dao/managersFileSystem/cartsManager.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req,res) => {
    try {
        const carts = await cartsManager.getCarts();
        res.json({carts});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    try {
        const cartById = await cartsManager.getCartById(+cid);
        console.log(cartById.products)
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
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

/*
Creación del carrito. Se modifica ya que la consigna indica que el carrito al ser creado no tendrá productos.
*/
router.post('/', async (req, res) => {
    try {
        //const {products} = request.body
        //if(products.length) {
            const newCart = await cartsManager.createCart(/*products*/)
            console.log(newCart)
            res.status(200).json({ mensaje: `Carrito con el id ${newCart.id} creado con éxito.`});
            
        /*
            } else {
            response.status(400).json({ mensaje: "No hay producto, no se crea carrito."})    
        }*/
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
    const {cid, pid} = req.params
    let { quantity } = req.body 
    //verifica si se envió cantidad, de lo contrario el método updateCart le asigna por defecto el valor 1.
    /*
    Quantity debe contener el numero de items del mismo producto. El producto de momento se agregará de uno en uno.
    */
    if(typeof quantity !== "number" || isNaN(quantity)) {
           quantity = 1
       }
    try {
        const updatedCart = await cartsManager.updateCart(+cid, +pid, quantity)
        console.log("updatedCart", updatedCart)
        if ( updatedCart ) {
            res.status(200).json({mensaje: `Del producto ${pid} se agregaron ${quantity} unidades al carrito ${cid} con éxito.`})
        } else {
            res.status(404).json({mensaje: `No se encontro el carrito con el id ${cid}.`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;
