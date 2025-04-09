import { body } from "express-validator";
import { createCustomValidatorMiddleware } from "./general.validator.js";

const title = body("title")
  .exists()
  .withMessage("Поле title обязательно!")
  .isString()
  .withMessage("Поле title должно быть строчкой!")
  .isLength({ min: 3 })
  .withMessage("Поле title должно содержать минимум 3 символа!");


const content = body("content")
  .exists()
  .withMessage("Поле content обязательно!")
  .isString()
  .withMessage("Поле content должно быть строчкой!")
  .isLength({ min: 5 })
  .withMessage("Поле content должно содержать минимум 5 символов!");

export const registerValidator = createCustomValidatorMiddleware([
  title, content
]);

export const loginValidator = createCustomValidatorMiddleware([
  title, content
]);