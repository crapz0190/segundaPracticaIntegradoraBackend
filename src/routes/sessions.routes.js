import { Router } from "express";
import {
  destroySession,
  restorePassword,
} from "../controllers/sessions.controllers.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// ruta GET permite desde un boton cerrar sesion
router.get("/signout", destroySession);

// ruta POST permite restaurar contraseña
router.post("/restore", restorePassword);

// ------------ SIGNUP - LOGIN - PASSPORT LOCAL------------

// ruta POST permite registrarse en la DB
router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/successful",
    failureRedirect: "/error",
  })
);

// ruta POST permite el ingreso del usuario a su cuenta
router.post(
  "/login",
  passport.authenticate("jwt", { session: false }),
  authMiddleware(["admin, user"]),
  passport.authenticate("login", {
    successRedirect: "/products",
    failureRedirect: "/error",
  })
);

// ------------ SIGNUP - LOGIN - PASSPORT GITHUB ------------

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/products");
  }
);

export default router;

// 00:48:23 min video 23
