import { body } from "express-validator";
import { createCustomValidatorMiddleware } from "./general.validator.js";

const name = body("name")
  .exists()
  .withMessage("Поле name обязательно!")
  .isString()
  .withMessage("Поле name должно быть строчкой!")
  .isLength({ min: 3 })
  .withMessage("Поле name должно содержать минимум 3 символа!");


const email = body("email")
  .exists()
  .withMessage("Поле email обязательно!")
  .isEmail()
  .withMessage("Поле email должно иметь в себе символ '@'!");

const password = body("password")
  .exists()
  .withMessage("Поле password обязательно!")
  .isString()
  .withMessage("Поле password должно быть строчкой!")
  .isStrongPassword()
  .withMessage("Ваш пароль слишком простой!");

  const isAdmin = body("isAdmin")
  .exists()
  .withMessage("Поле isAdmin обязательно!")
  .toBoolean()
  .isBoolean()
  .withMessage("Поле isAdmin должно быть булевым значением!")

export const registerValidator = createCustomValidatorMiddleware([
  name,
  email,
  password,
  isAdmin
]);

export const loginValidator = createCustomValidatorMiddleware([
  email,
  password
]);