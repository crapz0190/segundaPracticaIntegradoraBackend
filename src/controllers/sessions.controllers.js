import { usersManager } from "../db/managers/usersManager.js";
import { hashData } from "../utils.js";
// import { createAccessToken } from "../libs/jwt.js";

// Metodo GET permite desde un boton cerrar sesion
export const destroySession = (req, res) => {
  try {
    return req.session.destroy(() => {
      res.redirect("/login");
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo POST permite registrarse en la DB
// export const createUser = async (req, res) => {
//   try {
//     return res.status(200).json({ message: "User created" });
//   } catch (e) {
//     return res.status(500).json({ status: "error", message: e.message });
//   }
// };

// Metodo POST permite el ingreso del usuario a su cuenta
export const loginUser = async (req, res) => {
  // const token = createAccessToken(req.user);
  try {
    return res
      .status(200)
      .cookie("token", token, { maxAge: 60000, httpOnly: true })
      .json({ message: "Welcome" });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo POST permite restaurar contraseña
export const restorePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    const hashPassword = await hashData(password);
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated" });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};
