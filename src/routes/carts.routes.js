import { Router } from "express";
import {
  allCarts,
  cartById,
  createCart,
  updateCart,
  removeCart,
} from "../controllers/carts.controllers.js";

const router = Router();

// ruta GET para mostrar todos los carritos
router.get("/", allCarts);

// ruta GET para encontrar carritos por ID
router.get("/:cid", cartById);

// ruta POST para crear un carrito
router.post("/add", createCart);

// ruta PUT para agregar productos a un carrito
router.put("/:cid/product/:pid", updateCart);

// ruta DELETE para eliminar un carrito
router.delete("/:cid", removeCart);

export default router;
