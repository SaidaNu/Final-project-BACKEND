import { body } from "express-validator";
import { createCustomValidatorMiddleware } from "./general.validator.js";

const content = body("content")
  .exists()
  .withMessage("Поле content обязательно!")
  .isString()
  .withMessage("Поле content должно быть строчкой!")
  .isLength({ min: 1 })
  .withMessage("Поле content должно содержать минимум 1 символ!");

export const registerValidator = createCustomValidatorMiddleware([
content]);

export const loginValidator = createCustomValidatorMiddleware([
content]);