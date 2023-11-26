import { productsManager } from "../db/managers/productsManager.js";

// Metodo GET para mostrar productos por paginado
export const allProducts = async (req, res) => {
  try {
    const allProducts = await productsManager.paginate(req.query);
    if (allProducts.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Products not found" });
    } else {
      return res.status(200).json({ payload: allProducts });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};

// Metodo GET para encontrar productos por ID
export const productById = async (req, res) => {
  const { pid } = req.params;
  try {
    const productById = await productsManager.getById(pid);
    if (!productById) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    } else {
      return res.status(200).json({ status: "success", payload: productById });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo POST para crear productos
export const addProduct = async (req, res) => {
  const obj = req.body;
  const files = req.files.map((file) => file.filename);

  // Validación de campos del producto

  function validateProductFields(obj) {
    if (
      obj.title &&
      obj.description &&
      obj.code &&
      obj.price &&
      obj.stock &&
      obj.category
    ) {
      return true;
    }
    return false;
  }

  if (!validateProductFields(obj)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid product data" });
  }

  // Guarda los nombres de los archivos en el array de imágenes del producto
  obj.thumbnails = files;

  try {
    const createdProduct = await productsManager.createOne(obj);
    if (!createdProduct) {
      return res
        .status(500)
        .json({ status: "error", message: "Product could not be created" });
    } else {
      return res
        .status(200)
        .json({ status: "success", payload: createdProduct });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo PUT para actualizar productos por ID
export const updateProductById = async (req, res) => {
  const { pid } = req.params;
  const obj = req.body;
  const files = req.files.map((file) => file.filename);

  // Validación de campos del producto

  function validateProductFields(obj) {
    if (
      obj.title &&
      obj.description &&
      obj.code &&
      obj.price &&
      obj.stock &&
      obj.category
    ) {
      return true;
    }
    return false;
  }

  if (!validateProductFields(obj)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid product data" });
  }

  // Guarda los nombres de los archivos en el array de imágenes del producto
  obj.thumbnails = files;

  try {
    const foundId = await productsManager.getById(pid);
    if (!foundId) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    } else {
      const updateProduct = await productsManager.updateOne(pid, obj);
      return res.status(200).json({ status: "success", updateProduct });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

// Metodo DELETE para eliminar un producto por ID
export const removeProductById = async (req, res) => {
  const { pid } = req.params;

  const foundId = await productsManager.getById(pid);
  if (!foundId) {
    return res
      .status(404)
      .json({ status: "error", message: "Product not found" });
  }

  try {
    const removeProduct = await productsManager.deleteOne(pid);
    if (!removeProduct) {
      return res
        .status(500)
        .json({ status: "error", message: "Product removal failed" });
    } else {
      return res.status(200).json({ status: "success", removeProduct });
    }
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};
