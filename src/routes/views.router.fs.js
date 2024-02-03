import { Router } from "express";
import { productsManager } from "../dao/managersFileSystem/productsManager.js";

const router = Router();

router.get("/home", async (req, res) => {
    const products = await productsManager.getProducts({});
    res.render("home", { products });
  });
  
router.get("/realtimeproducts", async (req, res) => {
    const products = await productsManager.getProducts({});
    res.render("realTimeProducts", { products });
  });
  
export default router;
