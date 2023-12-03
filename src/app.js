import express from "express";
import { createServer } from "node:http";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { join } from "node:path";
import dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import { Server as SocketServer } from "socket.io";
import { productsModel } from "./db/models/products.model.js";
import { productsManager } from "./db/managers/productsManager.js";
import { messagesManager } from "./db/managers/messagesManager.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import env from "./dotenv.js";
import "./passport.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);
const io = new SocketServer(server);

// middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(dirname, "public")));
app.use(express.static(join(dirname, "public", "images")));
app.use(morgan("dev"));
app.use(cookieParser());

// session MongoStore
app.use(
  session({
    store: new MongoStore({
      mongoUrl: env.URI,
    }),
    secret: env.TOKEN_SECRET_MONGO,
    cookie: { maxAge: 60000 },
    // saveUninitialized: false,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// handlebars
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", join(dirname, "views"));

// routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/sessions", sessionsRouter);

export default server;

io.on("connection", (socketServer) => {
  console.log(`New client connected: ${socketServer.id}`);

  // -------------  INICIO actualizar/eliminar producto  -------------
  socketServer.on("idUpdateProducts", async (data) => {
    // console.log(data.productId);
    const pid = data.productId;

    const idFound = await productsManager.getById(pid);
    socketServer.emit("loadListProducts", idFound);
  });

  socketServer.on("updateListProducts", async (update) => {
    const id = update.idProductForm;
    await productsManager.updateOne(id, update);
  });

  socketServer.on("idDeleteProducts", async (data) => {
    const pid = data.productId;
    const deleteProduct = await productsManager.deleteOne(pid);
    socketServer.emit("loadListProducts", deleteProduct);
  });

  // -------------  FIN actualizar/elimnar producto  -------------

  // ------------------- inicio messages ---------------------
  socketServer.on("idUpdate", async (id) => {
    const idFound = await messagesManager.getById(id);
    socketServer.emit("loadlist", idFound);
  });

  socketServer.on("updatelist", async (update) => {
    const id = update.idMessageForm;
    delete update.idMessageForm;

    await messagesManager.updateOne(id, update);
  });

  socketServer.on("idDelete", async (id) => {
    const deleteProduct = await messagesManager.deleteOne(id);
    socketServer.emit("loadlist", deleteProduct);
  });

  // ------------------- fin messages ---------------------

  // ------------------ agregar producto a carrito ----------------
  socketServer.on("add-to-cart", async (data) => {
    // const productId = data.productId;
    console.log(data.productId);
    const pid = data.productId;
    try {
      const product = await productsModel.getById({ _id: pid });
      console.log("product--->", product);
    } catch (e) {
      console.error(e.message);
    }
  });
});
