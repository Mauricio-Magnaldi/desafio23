import express from 'express';
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/configDB.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouterFS from "./routes/views.router.fs.js";
import cartsRouterFS from "./routes/carts.router.fs.js";
import sessionsRouter from "./routes/sessions.router.js";
import { Server } from "socket.io";
import { messagesHandler } from "./handlers/handlers.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from 'passport';
import "./passport.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public'))

const URI="mongodb+srv://mongoDBAtlas:CZK39urZQ0G2UOv9@mycluster.ovaat6g.mongodb.net/ecommerce?retryWrites=true&w=majority";

//session
app.use(
    session({
        secret:"SESSIONSECRETKEY",
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
        store: new mongoStore({
            mongoUrl: URI,    
        }),
    })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/views", viewsRouter);
app.use("/api/cartsfs", cartsRouterFS);
app.use("/api/viewsfs", viewsRouterFS);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}.`);
})

const socketServer = new Server(httpServer);

const onConnection = async (socket) => {
    await messagesHandler(socketServer, socket);
}

socketServer.on("connection", onConnection);