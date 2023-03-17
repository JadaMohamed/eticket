import express from "express";
import cardController from "../controllers/card.controller.js";

const router = express.Router();

router.post("/", cardController.createCard);
router.post('/many', cardController.createManycard);
router.get('/', cardController.getAllCards);
router.get("/:id", cardController.getCardById);
router.patch("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

export default router;
