import { cartsModel } from "../models/carts.model.js";
import BasicManager from "./basicManager.js";

class CarsManager extends BasicManager {
  constructor() {
    super(cartsModel, ["products.product"]);
  }

  async createCart() {
    try {
      const newCart = { products: [] };
      const createCart = await cartsModel.create(newCart);
      return createCart;
    } catch (error) {
      console.error(error);
    }
  }

  async addProductsByCart(cid, pid, quantity) {
    try {
      const cart = await cartsModel.findById(cid);
      const founfIndex = cart.products.findIndex((item) =>
        item.product.equals(pid)
      );
      console.log(founfIndex);
      if (founfIndex === -1) {
        cart.products.push({ product: pid, quantity: 1 });
      } else {
        cart.products[founfIndex].quantity = quantity;
      }
      return cart.save();
    } catch (error) {
      console.error(error);
    }
  }
}

export const cartsManager = new CarsManager();
