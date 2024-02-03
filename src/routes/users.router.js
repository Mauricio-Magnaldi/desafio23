import { Router } from "express";
import { usersManagerMongoDB } from "../dao/managersMongoDB/usersManagerMongoDB.js"
//Ya no se uitiliza hashData y compareData de utils.js, debido a que se implementa passport.
import { hashData, compareData } from "../utils.js";
import passport from "passport";
import { jwtValidation } from "../midddlewares/jwt.middleware.js";

const router = Router();

//Lo comento por si es que al utilizar login con passport viene erróneamente hacia acá.
// router.get("/", async (req, res) => {
//     try {
//         const users = await usersManagerMongoDB.findAll();
//         res.status(200).json({mensaje: "Usuarios", users})
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// })

///api/users/3
router.get ("/:idUser", jwtValidation, async (req, res) => {
    const {idUser} = req.params;
try {
    const user = await usersManagerMongoDB.findById(idUser);
    res.status(200).json({mensaje: "Usuario", user})
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

router.delete ("/:idUser", async (req, res) => {
    const {idUser} = req.params;
try {
    const deletedUser = await usersManagerMongoDB.deleteOne(idUser);
    res.status(200).json({mensaje: "Usuario", deletedUser})
} catch (err) {
    res.status(500).json({ error: err.message });
}
})

export default router;
