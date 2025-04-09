import { User } from "../models/User.js";

class UserController {

  // Получить текущий профиль пользователя
  async getMe(req, res) {
    try {
      const user = await User.findById(req.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// Получить всех пользователей
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate("posts", "comments");

      if (!users.length) {
        throw new Error("Пользватели не найдены!");
      }
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить пользователя по id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new Error(`Пользователь с id ${id} не найден.`);
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить пользователя
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, isAdmin } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password, isAdmin },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error(`Пользователь с id ${id} не найден.`);
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление пользователя
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error(`Пользователь с id ${id} не найден.`);
      }

      res.json({ message: `Пользователь с id ${id} успешно удален!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
