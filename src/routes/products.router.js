import { Router } from "express";
import { productsManagerMongoDB } from "../dao/managersMongoDB/productsManagerMongoDB.js";

const router = Router();

//http://localhost:8080/api/products?sort=asc&limit=2&page=2
router.get("/", async (req, res) => {
    try {
        // if(category) {
        //     console.log("category",category)
        // }
        // const products = await productsManagerMongoDB.findAllProducts({limit, page, ...queryParams});
        const products = await productsManagerMongoDB.findAllProducts(req.query)
        res.json({products});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get ("/:idProduct", async (req, res) => {
        const {idProduct} = req.params;
    try {
        const product = await productsManagerMongoDB.findById(idProduct);
        res.status(200).json({mensaje: "Producto", product})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// //Entrega 6 - productos con paginacion. Boton agregar al carrito
// router.get("/products", async (req, res) => {
//     try {
//         const products = await productsManagerMongoDB.findAll();
//         //res.status(200).json({mensaje: "Producto", products})
//         console.log(products)
//        // res.render("productsPaginacion", { products });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })
// POST http://localhost:8080/api/products
// No olvidar colocar entre comillas el valor boolean
// {
//     "title":"Musculosa",
//     "description":"color blanca",
//     "code":"sin marca",
//     "price":150,
//     "status":"false",
//     "category":"ropa",
//     "thumbnails":"no hay"
//   }
router.post("/", async (req, res) => {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !status || !category || !thumbnails) {
             return res.status(400).json({mensaje: "Todos los datos excepto stock, son obligatorios."});
        }
        // //mongoose
        //// Defaults do **not** run on `null`, `''`, or value other than `undefined`.
        if(!stock) {
            delete req.body.stock
        }
    try {
        const createdProduct = await productsManagerMongoDB.createOne(req.body);
        res.status(200).json({mensaje: "Producto creado", user:createdProduct})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.delete ("/:idProduct", async (req, res) => {
    const {idProduct} = req.params;
try {
    const deletedProduct = await productsManagerMongoDB.deleteOne(idProduct);
    res.status(200).json({mensaje: "Producto eliminado.", deletedProduct})
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

//Armar este endpoint
// router.put("/:idProduct", async (req, res) => {
//     const {idProduct} = req.params;
//     const product = req.body;
//     try {
//         const deletedProduct = await productsManagerMongoDB.deleteOne(idProduct);
//         res.status(200).json({mensaje: "Producto eliminado.", deletedProduct})
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }    
// })

export default router;
