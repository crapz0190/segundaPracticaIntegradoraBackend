/* eslint-disable no-dupe-keys */
import { productsManager } from "../dao/managers/productsManager.js";
import { messagesManager } from "../dao/managers/messagesManager.js";
import { cartsManager } from "../dao/managers/cartsManager.js";

class ViewsControllers {
  // Metodo GET para visualizar mensages
  listMessages = async (req, res) => {
    try {
      const getMessages = await messagesManager.findAll();
      return res.render("messages", {
        title: "Messages | Handlebars",
        messages: getMessages,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // ruta GET para enviar actualizacion de los mensages
  renderEditMessage = async (req, res) => {
    const { mid } = req.params;

    try {
      const messages = await messagesManager.getById(mid);
      const { _id, email, description } = messages;

      return res.render("updateMessages", {
        title: "Update Form | Handlebars",
        _id,
        email,
        description,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar productos
  listProducts = async (req, res) => {
    if (!req.session.passport) {
      return res.redirect("/login");
    }

    const { first_name, email, cart } = req.user;

    const idFound = await cartsManager.getById(cart);
    const idCart = idFound._id;
    // console.log("id see", idCart);

    try {
      const products = await productsManager.paginate(req.query);
      const {
        payload,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      } = products;

      payload.map((item) => {
        item.firstThumbnail = item.thumbnails[0];
        return item;
      });

      res.render("products", {
        title: "Products | Handlebars",
        payload,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
        first_name,
        email,
        idCart,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar formulario de carga de productos
  productsLoading = (req, res) => {
    try {
      return res.render("formProducts", {
        title: "Upload products | Handlebars",
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar detalles del producto seleccionado
  productDetail = async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productsManager.getById(pid);

      const { _id, title, description, price, stock, category, thumbnails } =
        product;

      return res.render("productDetail", {
        title: "Details Products | Handlebars",
        _id,
        title,
        description,
        price,
        stock,
        category,
        thumbnails,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para actualizar productos
  updateProduct = async (req, res) => {
    try {
      const products = await productsManager.paginate(req.query);
      const { payload } = products;

      payload.map((item) => {
        item.firstThumbnail = item.thumbnails[0];
        return item;
      });

      payload.map((item) => {
        item.IdProductUpdate = item._id;
        return item;
      });

      return res.render("updateProducts", {
        title: "Update products| Handlebars",
        payload,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para visualizar login
  login = (req, res) => {
    if (req.session.passport) {
      return res.redirect("/products");
    }

    try {
      return res.render("login", {
        title: "Login | Handlebars",
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para visualizar signup
  signup = (req, res) => {
    if (req.session.passport) {
      return res.redirect("/products");
    }

    try {
      return res.render("signup", {
        title: "Sign Up | Handlebars",
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para restaurar contraseña
  resetPassword = (req, res) => {
    try {
      return res.render("restore", {
        title: "Restore Password | Handlebars",
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar error
  failureRedirect = (req, res) => {
    // console.log("sessions", req);
    const message = req.session.messages[0];
    res.render("error", {
      title: "Error | Handlebars",
      message: message,
    });
  };

  // Metodo GET para visualizar creacion exitosa del producto
  successfulCreation = (req, res) => {
    res.render("successful");
  };

  // Metodo GET para visualizar carrito de productos
  productCart = (req, res) => {
    // console.log(req.params);
    res.render("productCart", {
      title: "Product Cart | Handlebars",
    });
  };
}

export const viewController = new ViewsControllers();
