/* eslint-disable no-dupe-keys */
import { productsManager } from "../dao/managers/productsManager.js";
import { messagesManager } from "../dao/managers/messagesManager.js";
import { cartsManager } from "../dao/managers/cartsManager.js";

class ViewsControllers {
  home = async (req, res) => {
    try {
      return res.render("layouts/main", {
        title: "Home | Handlebars",
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para visualizar mensages
  listMessages = async (req, res) => {
    const { cart, role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

    try {
      const getMessages = await messagesManager.findAll();
      return res.render("messages", {
        title: "Messages | Handlebars",
        messages: getMessages,
        cart,
        roleAdmin,
        roleUser,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // ruta GET para enviar actualizacion de los mensages
  renderEditMessage = async (req, res) => {
    const { mid } = req.params;
    const { cart, role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

    try {
      const messages = await messagesManager.getById(mid);
      const { _id, email, description } = messages;

      return res.render("updateMessages", {
        title: "Update Form | Handlebars",
        _id,
        email,
        description,
        cart,
        roleAdmin,
        roleUser,
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

    const { first_name, email, cart, role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

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

      payload.map((product) => {
        product.firstThumbnail = `/images/${product.thumbnails[0]}`;
        return product;
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
        cart,
        roleAdmin,
        roleUser,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar formulario de carga de productos
  productsLoading = (req, res) => {
    const { role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

    try {
      return res.render("formProducts", {
        title: "Upload products | Handlebars",
        roleAdmin,
        roleUser,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar detalles del producto seleccionado
  productDetail = async (req, res) => {
    const { pid } = req.params;
    const cartFound = await cartsManager.getById(req.user.cart);
    const idCart = cartFound._id;
    const { cart, role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

    try {
      const product = await productsManager.getById(pid);
      const thumbnailsData = product.thumbnails.map(
        (thumbnail) => `/images/${thumbnail}`
      );

      const { _id, title, description, price, stock, category } = product;

      return res.render("productDetail", {
        title: "Details Products | Handlebars",
        _id,
        idCart,
        title,
        description,
        price,
        stock,
        category,
        thumbnails: thumbnailsData,
        cart,
        roleAdmin,
        roleUser,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para actualizar productos
  updateProduct = async (req, res) => {
    const { role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

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
        roleAdmin,
        roleUser,
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

    const isAuthenticated = req.user === undefined;

    try {
      return res.render("login", {
        title: "Login | Handlebars",
        isAuthenticated,
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

    const isAuthenticated = req.user === undefined;

    try {
      return res.render("signup", {
        title: "Sign Up | Handlebars",
        isAuthenticated,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para restaurar contraseña
  resetPassword = (req, res) => {
    const isAuthenticated = req.user === undefined;

    try {
      return res.render("restore", {
        title: "Restore Password | Handlebars",
        isAuthenticated,
      });
    } catch (e) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  };

  // Metodo GET para mostrar error
  failureRedirect = (req, res) => {
    const isAuthenticated = req.user === undefined;

    const message = req.session.messages[0];
    res.render("error", {
      title: "Error | Handlebars",
      message: message,
      isAuthenticated,
    });
  };

  // Metodo GET para visualizar creacion exitosa del producto
  successfulCreation = (req, res) => {
    res.render("successful");
  };

  // Metodo GET para visualizar carrito de productos
  cart = async (req, res) => {
    if (!req.session.passport) {
      return res.redirect("/login");
    }

    const { cid } = req.params;
    const { role } = req.user;

    const roleAdmin = role === "admin";
    const roleUser = role === "user";

    try {
      const cartFound = await cartsManager.getById(cid);

      if (cartFound && cartFound.products) {
        const productsData = cartFound.products.map((product) => {
          const idCart = cartFound._id;
          // console.log("isCart", idCart);
          // const thumbnailsData = product.product.thumbnails.map((thumbnail) => {
          //   return {
          //     url: `/images/${thumbnail}`,
          //   };
          // });
          const thumbnailData =
            product.product.thumbnails.length > 0
              ? `/images/${product.product.thumbnails[0]}`
              : "/default-image.jpg";

          return {
            idCart: idCart,
            id: product.product._id,
            title: product.product.title,
            price: product.product.price,
            thumbnail: thumbnailData,
            quantity: product.quantity,
          };
        });

        return res.render("cart", {
          title: "Shopping Cart",
          products: productsData,
          roleAdmin,
          roleUser,
        });
      } else {
        return res.render("cart", {
          title: "Shopping Cart",
          products: [],
        });
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      return res.status(500).json({ status: "error", message: e.message });
    }
  };
}

export const viewController = new ViewsControllers();
