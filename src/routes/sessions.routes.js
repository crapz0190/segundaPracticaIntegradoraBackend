import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { sessionController } from "../controllers/sessions.controllers.js";
import passport from "passport";

const router = Router();

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  authMiddleware(["user"]),
  (req, res) => {
    const user = req.user;
    return res.json({ message: user });
  }
);

// ruta GET permite desde un boton cerrar sesion
router.get("/signout", sessionController.destroySession);

// ruta POST permite restaurar contraseña
router.post("/restore", sessionController.restorePassword);

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
  passport.authenticate("login", {
    failureMessage: true,
    failureRedirect: "/error",
    // successRedirect: "/products",
  }),
  sessionController.loginUser
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
