import { Router } from "express";
//Ya no se uitiliza hashData y compareData de utils.js, debido a que se implementa passport.
import { hashData, compareData, generateToken } from "../utils.js"; //Al no utilizar passport, si necesitamos <-
import { usersManagerMongoDB } from "../dao/managersMongoDB/usersManagerMongoDB.js"; //Al no utilizar passport, si necesitamos <-
import passport from "passport";

const router = Router();

//ESTO DEBE IR AQUI, DE LO CONTRARIO DA EL ERROR
//{"error":"Cast to ObjectId failed for value \"logout\" (type string) at path \"_id\" for model \"Users\""}
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})

//Se comenta para utilizar JWT con login tradicional.
// //Passport - singup
// router.post(
//     "/signup", 
//     passport.authenticate("signup", {
//         successRedirect: "/home",
//         failureRedirect: "/error",
//     }));

// //Passport - login
// router.post(
//     "/login", 
//     passport.authenticate("login", {
//     successRedirect: "/home", 
//     failureRedirect: "/error",
//     }));

//Github
router.get(
    "/auth/github", 
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);

router.get(
    "/github", 
    passport.authenticate("github", {
        failureRedirect: "/error", 
 }),
 (req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
 }
);

//Se comenta, no corresponde a passport.
//Se genera la sesión.
router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({mensaje: "Todos los datos son obligatorios."});
        }
    try {
        const userDB = await usersManagerMongoDB.findByEmail(email);
        if(!userDB) {
            return res.json({error: "Credenciales invalidas."});
        }
        const comparePassword = await compareData(password, userDB.password);
        if (!comparePassword) {
            return res.json({error: "Credenciales invalidas."});
        } 
        // req.session["email"] = email;
        // req.session["first_name"] = userDB.first_name;
        // req.session["userType"] = 
        //     email === "adminCoder@coder.com" && password === "adminCod3r123" ? "admin" : "usuario";
        const token = generateToken({email, first_name: userDB.first_name, role: userDB.role});
        res.status(200).json({mensaje: `Bienvenido ${userDB.first_name}`,token});
        //res.redirect("/home");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//Se comenta, no corresponde a passport.
//Se registra por primera y única vez en la aplicación.
router.post("/signup", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({mensaje: "Todos los datos son obligatorios."});
        }
    try {
        const userDB = await usersManagerMongoDB.findByEmail(email);
        if ( userDB ) {
            return res.status(401).json({mensaje: "Un usuario con el mismo email ya existe."});
        }
        const hashedPassword = await hashData(password);
        const createdUser = await usersManagerMongoDB.createOne({...req.body, password : hashedPassword});
        res.status(200).json({mensaje:"Usuario creado.", user: createdUser});
        //res.redirect("/home");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;