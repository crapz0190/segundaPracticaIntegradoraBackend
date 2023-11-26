import { Router } from "express";
import {
  login,
  signup,
  resetPassword,
  listProducts,
  productsLoading,
  productDetail,
  updateProduct,
  listMessages,
  failureRedirect,
  successfulCreation,
} from "../controllers/views.controllers.js";

const router = Router();

// ruta GET para visualizar login
router.get("/login", login);

// ruta GET para visualizar signup
router.get("/signup", signup);

// ruta GET para restaurar contraseña
router.get("/restore", resetPassword);

// ruta GET para mostrar error
router.get("/error", failureRedirect);

// ruta GET para mostrar productos
router.get("/products", listProducts);

// ruta GET para mostrar formulario de carga de productos
router.get("/product-upload-form", productsLoading);

// ruta GET para mostrar detalles del producto seleccionado
router.get("/product-detail/:pid", productDetail);

// ruta GET para actualizar productos
router.get("/update-product", updateProduct);

// ruta GET para visualizar los mensages
router.get("/messages-form", listMessages);

// ruta GET para visualizar creacion exitosa del producto
router.get("/successful", successfulCreation);

export default router;
