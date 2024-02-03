import { productsManager } from "../dao/managersFileSystem/productsManager.js";
import { Router } from "express";

const router = Router();

//Endpoints Productos
//Se prueba desde la extensión Thunder Client en VSC -> get -> body -> json
router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        if (!products.length) {
            res.status(200).json({mensaje: 'Sin productos encontrados.'});
        } else {
            res.status(200).json({mensaje: `${products.length} productos encontrados.`, products});
  //          console.log("limite ",limit)
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
})

router.get("/:idProduct", async (req, res) => {
    //Recibo el idProduct a buscar desde params
    const {idProduct} = req.params;
    try {
        const product = await productsManager.getProductById(+idProduct);
        if (!product) {
            res.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        } else {
            res.status(200).json({message: 'Producto encontrado.',product});
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
})

//Añadir un producto
router.post("/", async (req, res) => {
    const product = req.body;
    const {title, description, code, price, status, stock, category, thumbnails} = product;
    /*
    Verificación para asegurarse de que el campo "thumbnails" sea un array y que cada elemento del array sea de tipo string. 
    */
    if (!Array.isArray(thumbnails) || thumbnails.some(item => typeof item !== "string")) {
        return response.status(400).json({ mensaje: 'Error de validación. El campo "thumbnails" debe ser un array de strings. Producto no agregado.' });
    }

  
    if (!title || !description || !code || !price || !status || !stock || !category || thumbnails.length === 0) {
        return res.status(400).json({mensaje: 'Error de validación. No has especificado al menos un campo. Producto no agregado.'});
    }
    try {
        const newProduct = await productsManager.createProduct(product);
        if(newProduct.error) {
            res.status(400).json({mensaje: newProduct.error});
        } else {
            res.status(200).json({mensaje: "Producto creado exitosamente", newProduct}); 
        }
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
})

//Eliminar un producto
router.delete('/:idProduct', async (req, res) => {
    //Recibo el idProduct a buscar desde params
    const {idProduct} = req.params;
    try {
        const product = await productsManager.deleteProduct(+idProduct);
        if (product) {
            res.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Eliminado.`});
        } else {
            res.status(400).json({mensaje: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        }
    } catch (error) {
        res.status(500).json({mensaje: error});
    }
})

//Modificar un producto
router.put('/:idProduct', async (req, res) => {
//Recibo el idProduct a buscar desde params y por body los parámetros cuyos valores quiere actualizar.
    const {idProduct} = req.params;
    try {
        const updateProduct = await productsManager.updateProduct(+idProduct, request.body);
        console.log("Producto",updateProduct)
        if (updateProduct === -1) {
            res.status(400).json({message: `Código de Error 404. Producto con id: ${idProduct} no encontrado.`});
        } else {
            res.status(200).json({mensaje: `Producto con id: ${idProduct} encontrado. Modificado.`});
        }
    } catch (error) {
        res.status(500).json({message: error});
    }
})

export default router;