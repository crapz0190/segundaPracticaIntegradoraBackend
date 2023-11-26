import { Router } from "express";
import {
  listMessages,
  messageById,
  createMessages,
  updateMessages,
  deleteMessages,
} from "../controllers/messages.controllers.js";

const router = Router();

// ruta GET para mostrar todos los mensages
router.get("/", listMessages);

// ruta GET para mostrar mensage por ID
router.get("/:mid", messageById);

// ruta POST para crear mensages
router.post("/add", createMessages);

// ruta PUT para actualizar mensages
router.put("/:mid", updateMessages);

// ruta DELETE para eliminar mensages
router.delete("/:mid", deleteMessages);

export default router;
