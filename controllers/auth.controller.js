import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { hashPassword, checkValidPassword } from "../services/bcrypt.js";

class AuthController {
  // Реализуем регистрацию пользователя
  async register(req, res) {
    try {
      const { name, email, password, isAdmin } = req.body;

      const emailAlreadyExists = await User.findOne({ email });
      if (emailAlreadyExists) {
        return res
          .status(409)
          .json({ message: "Данная электронная почта занята!" });
      }

      // Хэшируем пароль
      const hashedPassword = await hashPassword(password);

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        isAdmin,
      }).save();
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Осуществляем вход пользователя
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Неверный e-mail или пароль" });
      }

      const passwordIsValid = await checkValidPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(404).json({ message: "Неверный e-mail или пароль" });
      }

      const token = jwt.sign(
        { userId: user._id, name: user.name, isAdmin: user.isAdmin }, // Payload
        "secretkey", // Secret key
        { expiresIn: "12h" } // Expires In (options)
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
