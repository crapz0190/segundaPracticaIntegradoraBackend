/* eslint-disable no-dupe-keys */
import { productsManager } from "../db/managers/productsManager.js";
import { messagesManager } from "../db/managers/messagesManager.js";

// Metodo GET para visualizar mensages
export const listMessages = async (req, res) => {
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

// Metodo GET para mostrar productos
export const listProducts = async (req, res) => {
  if (!req.session.passport) {
    return res.redirect("/login");
  }

  const { first_name, email } = req.user;

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

    return res.render("products", {
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
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo GET para mostrar formulario de carga de productos
export const productsLoading = (req, res) => {
  try {
    return res.render("formProducts", {
      title: "Upload products | Handlebars",
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo GET para mostrar detalles del producto seleccionado
export const productDetail = async (req, res) => {
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
export const updateProduct = async (req, res) => {
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
export const login = (req, res) => {
  try {
    if (req.user) {
      return res.redirect("/products");
    }
    return res.render("login", {
      title: "Login | Handlebars",
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo GET para visualizar signup
export const signup = (req, res) => {
  if (req.user) {
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
export const resetPassword = (req, res) => {
  try {
    return res.render("restore", {
      title: "Restore Password | Handlebars",
    });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo GET para mostrar error
export const failureRedirect = (req, res) => {
  res.render("error", {
    title: "Error | Handlebars",
  });
};

// Metodo GET para visualizar creacion exitosa del producto
export const successfulCreation = (req, res) => {
  res.render("successful");
};
