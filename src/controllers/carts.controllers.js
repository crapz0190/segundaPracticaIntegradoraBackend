import { cartsManager } from "../db/managers/cartsManager.js";
// import { cartsModel } from "../db/models/carts.model.js";

// Metodo GET para mostrar todos los carritos
export const allCarts = async (req, res) => {
  try {
    const allCarts = await cartsManager.getAll();
    console.log(allCarts.length);
    if (allCarts.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Carts not found" });
    } else {
      return res.status(200).json({ status: "success", payload: allCarts });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};

// Metodo GET para encontrar carrito por ID
export const cartById = async (req, res) => {
  const { cid } = req.params;
  try {
    const cartById = await cartsManager.getById(cid);
    if (!cartById) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
    } else {
      return res.status(200).json({ status: "success", payload: cartById });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};

// Metodo POST para crear un carrito
export const createCart = async (req, res) => {
  try {
    const createCart = await cartsManager.createCart();
    if (!createCart) {
      return res
        .status(500)
        .json({ status: "error", error: "Could not create cart" });
    } else {
      return res.status(200).json({ status: "success", payload: createCart });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};

// Metodo PUT para agregar productos a un carrito
export const updateCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (typeof cid !== "string" || typeof pid !== "string") {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid input data" });
  }
  try {
    const updateCart = await cartsManager.addProductsByCart(cid, pid, quantity);
    return res.status(200).json({ status: "success", payload: updateCart });
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};

// Metodo DELETE para eliminar un carrito
export const removeCart = async (req, res) => {
  const { cid } = req.params;

  const foundId = await cartsManager.getById(cid);
  if (!foundId) {
    return res.status(404).json({ status: "error", message: "Cart not found" });
  }

  try {
    const removeCart = await cartsManager.deleteOne(cid);
    if (!removeCart) {
      return res
        .status(500)
        .json({ status: "error", message: "Product removal failed" });
    } else {
      return res.status(200).json({ status: "success", payload: removeCart });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};
