import { Router } from "express";
import { cartController } from "../controllers/carts.controllers.js";

const router = Router();

// ruta GET para mostrar todos los carritos
router.get("/", cartController.allCarts);

// ruta GET para encontrar carritos por ID
router.get("/:cid", cartController.cartById);

// ruta POST para crear un carrito
router.post("/add", cartController.createCart);

// ruta PUT para agregar productos a un carrito
router.put("/:cid/product/:pid", cartController.updateCart);

// ruta DELETE para eliminar un carrito
router.delete("/:cid", cartController.removeCart);

// ruta DELETE para eliminar un producto del carrito
router.delete("/:cid/product/:pid", cartController.removeProductByCart);

export default router;
