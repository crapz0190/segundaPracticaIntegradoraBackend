import { Router } from "express";
import { upload } from "../utils.js";
import {
  allProducts,
  addProduct,
  productById,
  updateProductById,
  removeProductById,
} from "../controllers/products.controllers.js";

const router = Router();

// ruta GET para mostrar productos por paginado
router.get("/", allProducts);

// ruta GET para encontrar productos por ID
router.get("/:pid", productById);

// ruta POST para crear productos
router.post("/add", upload.array("thumbnails", 5), addProduct);

// ruta PUT para actualizar productos por ID
router.put("/:pid", upload.array("thumbnails", 5), updateProductById);

// ruta DELETE para eliminar un producto por ID
router.delete("/:pid", removeProductById);

export default router;
