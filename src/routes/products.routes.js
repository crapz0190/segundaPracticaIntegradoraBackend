import { Router } from "express";
import { upload } from "../utils.js";
import { productController } from "../controllers/products.controllers.js";

const router = Router();

// ruta GET para mostrar productos por paginado
router.get("/", productController.allProducts);

// ruta GET para encontrar productos por ID
router.get("/:pid", productController.productById);

// ruta POST para crear productos
router.post(
  "/add",
  upload.array("thumbnails", 5),
  productController.addProduct
);

// ruta PUT para actualizar productos por ID
router.put(
  "/:pid",
  upload.array("thumbnails", 5),
  productController.updateProductById
);

// ruta DELETE para eliminar un producto por ID
router.delete("/:pid", productController.removeProductById);

export default router;
