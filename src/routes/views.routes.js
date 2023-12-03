import { Router } from "express";
import { viewController } from "../controllers/views.controllers.js";
import { messagesManager } from "../dao/managers/messagesManager.js";

const router = Router();

// ruta GET para visualizar login
router.get("/login", viewController.login);

// ruta GET para visualizar signup
router.get("/signup", viewController.signup);

// ruta GET para restaurar contraseña
router.get("/restore", viewController.resetPassword);

// ruta GET para mostrar error
router.get("/error", viewController.failureRedirect);

// ruta GET para mostrar productos
router.get("/products", viewController.listProducts);

// ruta GET para mostrar formulario de carga de productos
router.get("/product-upload-form", viewController.productsLoading);

// ruta GET para mostrar detalles del producto seleccionado
router.get("/product-detail/:pid", viewController.productDetail);

// ruta GET para actualizar productos
router.get("/update-product", viewController.updateProduct);

// ruta GET para visualizar los mensages
router.get("/messages-form", viewController.listMessages);

// ruta GET para actualizar los mensages
router.get("/messages/:mid", viewController.renderEditMessage);

// ruta GET para visualizar creacion exitosa del producto
router.get("/successful", viewController.successfulCreation);

export default router;
