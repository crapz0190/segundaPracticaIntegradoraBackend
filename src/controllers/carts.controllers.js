import { cartsManager } from "../dao/managers/cartsManager.js";
// import { cartsModel } from "../db/models/carts.model.js";

class CartController {
  // Metodo GET para mostrar todos los carritos
  allCarts = async (req, res) => {
    try {
      const allCarts = await cartsManager.getAll();
      // console.log(allCarts.length);
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
  cartById = async (req, res) => {
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
  createCart = async (req, res) => {
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
  updateCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    // console.log("quantity-1", +quantity);

    if (typeof cid !== "string" || typeof pid !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input data" });
    }
    try {
      const updateCart = await cartsManager.addProductsByCart(
        cid,
        pid,
        +quantity
      );
      return res.status(200).json({ status: "success", payload: updateCart });
    } catch (e) {
      return res.status(500).json({ status: "error", error: e.message });
    }
  };

  // Metodo DELETE para eliminar un carrito
  removeCart = async (req, res) => {
    const { cid } = req.params;

    const foundId = await cartsManager.getById(cid);
    if (!foundId) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found" });
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

  // Metodo DELETE para eliminar un  producto del carrito
  removeProductByCart = async (req, res) => {
    const { cid, pid } = req.params;

    if (typeof cid !== "string" || typeof pid !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid input data" });
    }
    try {
      const removeProductByCart = await cartsManager.deleteProductByCart(
        cid,
        pid
      );
      return res.status(200).json({
        status: "Product removed from cart",
        payload: removeProductByCart,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", error: e.message });
    }
  };
}

export const cartController = new CartController();
