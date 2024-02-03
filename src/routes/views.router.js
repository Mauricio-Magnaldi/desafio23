import { Router } from "express";
import { usersManagerMongoDB } from "../dao/managersMongoDB/usersManagerMongoDB.js";
import { productsManagerMongoDB } from "../dao/managersMongoDB/productsManagerMongoDB.js";
import { cartsManagerMongoDB } from "../dao/managersMongoDB/cartsManagerMongoDB.js";

const router = Router();

//localhost:8080 -> vista login
router.get("/", (req, res) => {
  res.render("login");
})

router.get("/chat", (req, res) => {
  res.render("chat");
})

//localhost:8080/signup -> vista signup
router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/createProduct", (req, res) => {
    res.render("createProduct");
})

router.get("/home", async (req, res) => {
    const products = await productsManagerMongoDB.findAllProductsView({});
    //const {first_name, userType} = req.session;
    //res.render("home", {first_name, userType, products});
    console.log
    res.render("home", {first_name: req.user.first_name, products});
  });
  
  router.get("/homeDB", async (req, res) => {
    const products = await productsManagerMongoDB.getProducts({});
    res.render("homeDB", { products });
  });

router.get("/home/:idUser", async (req, res) => {
    const { idUser } = req.params
    const userInfo = await usersManagerMongoDB.findById(idUser)
    const {first_name, last_name, userType} = userInfo
    const products = await productsManagerMongoDB.findAll() 
    res.render("home",{ first_name, last_name, userType, products});
})

router.get("/error", (req, res) => {
  res.render("error");
})

export default router;
